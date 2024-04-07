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

  //Login usuarios
  async login(req: Request, res: Response): Promise<void | Response<any>> {
    const { password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      //Validar existencia de  email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
      }
      //Encontrar un usuario por su email

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

      //Verificar usuario inexistente
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password doesn't exist",
        });
      }

      //Verificar contraseña si el usuario existe
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password doesn't exist",
        });
      }

      //Generar token
      const roles = user.roles.map((role) => role.name)

      const tokenPayLoad: TokenData = {
         email:user.email,
      userId: user.id?.toString() as string,
       userRoles: roles,
       username: user.username,
       name:user.name,
    
    


       };

       const token = jwt.sign(tokenPayLoad, '123', {
        expiresIn: '3h',
       });
        console.log(token)

      res.status(StatusCodes.OK).json({
        message: "Login succesfully!",
        token, 
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
      });
    }
  }
}
