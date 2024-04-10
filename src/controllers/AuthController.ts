import { Request, Response } from "express";
import { CreateUserRequestBody, TokenData } from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../data-source";
import { Artists } from "../models/Artists";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

//-----------
export class AuthController {
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const {
      username,
      password,
      name,
      surname,
      email,
    
    } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const artistRespository = AppDataSource.getRepository(Artists);

    try {
      //Crear un nuevo usuario
      const newUser: User = {
        username,
        email,
        name,
        surname,
        password: bcrypt.hashSync(password, 10),
        roles: [UserRoles.CLIENT],
      };
      await userRepository.save(newUser);

      res.status(StatusCodes.CREATED).json({
        message: "Register succesfully!",
      });
    } catch (error: any) {
      console.error("Error while register:", error);
      res.status(500).json({
        message: "Error while register",
        error: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void | Response<any>> {
    const { password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const artistRepository = AppDataSource.getRepository(Artists);

    try {
      // Validar existencia de email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
      }

      // Encontrar un usuario por su email
      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        relations: {
          roles: true,
        },
        select: {
          username: true,
          password: true,
          email: true,
          name: true,
          id: true,
          roles: {
            name: true,
          },
        },
      });

      // Encontrar un artista por su email
      const artist = await artistRepository.findOne({
        where: {
          email: email,
        },
        select: {
          username: true,
          password: true,
          email: true,
          music: true,
          id: true,
          genre: true,
          events: true,
        },
      });

      // Verificar si ni el usuario ni el artista existen
      if (!user && !artist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password doesn't exist",
        });
      }

      // Verificar contraseña si el usuario existe
      if (user) {
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Email or password doesn't exist",
          });
        }

        // Generar token para usuario
        const roles = user.roles.map((role) => role.name)
        const tokenPayLoad: TokenData = {
          email: user.email,
          userId: user.id?.toString() as string,
          userRoles: roles,
          username: user.username,
          name: user.name,
        };
        const token = jwt.sign(tokenPayLoad, '123', {
          expiresIn: '3h',
        });
        console.log(token)

        return res.status(StatusCodes.OK).json({
          message: "Login successfully!",
          token,
        });
      }

      // Verificar contraseña si el artista existe
      if (artist) {
        const isPasswordValid = bcrypt.compareSync(password, artist.password);
        if (!isPasswordValid) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Email or password doesn't exist",
          });
        }

        // Generar token para artista
        const tokenPayLoad: TokenData = {
          email: artist.email,
          userId: artist.id?.toString() as string,
          userRoles: ['admin'], // Asignar el rol de ARTIST al artista
          username: artist.username,
          name: `${artist.name} ${artist.surname}`, // Suponiendo que tienes un campo 'surname' en tu modelo de Artista
        };
        const token = jwt.sign(tokenPayLoad, '123', {
          expiresIn: '3h',
        });
        console.log(token)

        return res.status(StatusCodes.OK).json({
          message: "Login successfully!",
          token,
        });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
      });
    }
  }
}