import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/Users";
import { AppDataSource } from "../data-source";
import { Artists
 } from "../models/Artists";
import { UserRoles } from "../constants/UserRoles";
import {
   CreateUserRequestBody,} from "../types/types";
import bcrypt from "bcrypt";

// -----------------------------------------------------------------------------

export class ArtistController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
          const artistRepository = AppDataSource.getRepository(Artists);
  
          const allArtists = await artistRepository.find({
              relations: ['user'],
          });
  
          const userArtistIds = allArtists.map(artist => {
              return {
                  id: artist.id,
                  name: artist.user.name,
                  genre: artist.genre,
                  music: artist.music,
                  events: artist.events,
                  username: artist.user.username,
                  surname: artist.user.surname,
                  email: artist.user.email,

              };
          });
  
          res.status(200).json({ userArtistIds });
  
      } catch (error) {
          res.status(500).json({
              message: "Error while getting artist",
          });
      }
  }
   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const artistRepository = AppDataSource.getRepository(Artists);
         const artist = await artistRepository.findOneBy({
            id: id,
         });

         if (!artist) {
            return res.status(404).json({
               message: "Artist not found",
            });
         }

         res.status(200).json(artist);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting artist",
         });
      }
   }


   async create(
      req: Request<{}, {},CreateUserRequestBody>,
      res: Response
    ): Promise<void | Response<any>> {
      const { username, name, surname, password, email } = req.body;
    
      const userRepository = AppDataSource.getRepository(User);
      
    
      try {
        // Crear nuevo usuario
        const newUser: User = {
          username,
          name,
          surname,
          email,
          password: bcrypt.hashSync(password, 10),
          roles: [UserRoles.ADMIN],
        };
        await userRepository.save(newUser);
     //Crear nuevo artista asociado al usuario
        
     if (newUser.roles.includes(UserRoles.ADMIN)) { 
        // Si es un artista, también crea una entrada en la tabla de artistas. 
        const artistRepository = AppDataSource.getRepository(Artists); 
        const newArtist = artistRepository.create({ 
          user_id: newUser.id, // Asocia el nuevo artista con el usuario recién creado. 
        }); 
   
        await artistRepository.save(newArtist); 
      } 
   
      res.status(201).json("Artist succesfully created!"); 
    } catch (error: any) { 
      console.error("Error while creating artist:", error); 
      res.status(500).json({ 
        message: "Error while creating artis", 
        error: error.message, 
      }); 
    } 
  }
 
    

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const artistRepository = AppDataSource.getRepository(Artists);
         const artistUpdated = await artistRepository.update({ id: id }, data);
         res.status(202).json({
            message: "Artist updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating artist",
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const artistRepository = AppDataSource.getRepository(Artists);
         await artistRepository.delete(id);

         res.status(200).json({
            message: "Artist deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting Artist",
         });
      }
   }
}