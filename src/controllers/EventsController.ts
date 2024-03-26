import { Request, Response } from "express";
import { Events } from "../models/Events";
import { CreateEventAttendance1711452768525 } from "../database/migrations/1711452768525-CreateEventAttendance";

import { Controller } from "./Controller";
import { CreateEvent_AttendanceRequestBody, CreateEventsRequestBody } from "../types/types";
import { AppDataSource } from "../data-source";
import { Event_Attendance } from "../models/Event_Attendance";


//----------------------------------------------------------------------

export class AppointmentController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const event_attendanceRespository = AppDataSource.getRepository(Event_Attendance);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allevents_attendance, count] = await event_attendanceRespository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               id: true,
               user_id: true,
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allevents_attendance,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting events",
         });
      }
   }
   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
          const id = +req.params.id; // Obtén el ID del usuario de la URL
          const event_attendanceRespository = AppDataSource.getRepository(Event_Attendance
            
            );
          const appointments = await event_attendanceRespository.findBy({
              user_id: id, // Utiliza el ID del usuario para buscar sus appointments
          });
  
          if (!appointments) {
              return res.status(404).json({
                  message: "Event not found",
              });
          }
  
          res.status(200).json(appointments);
      } catch (error) {
          res.status(500).json({
              message: "Error while getting your event attendance",
          });
      }
  }
   async getByArtistId(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const event_attendanceRespository = AppDataSource.getRepository(Event_Attendance);
         const event_attendance = await event_attendanceRespository.findBy({
            user_id: id,
         });

         if (!event_attendance) {
            return res.status(404).json({
               message: "Attendance not found",
            });
         }

         res.status(200).json(event_attendance);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting events",
         });
      }
   }


   async create(
      req: Request<{}, {}, CreateEvent_AttendanceRequestBody>,

      res: Response
   ): Promise<void | Response<any>> {
      const { user_id , event_id} = req.body;

      const event_attendanceRepository= AppDataSource.getRepository(Event_Attendance);
      try {
         const newEventAttendance: Event_Attendance = {
            user_id,
            event_id
            
         }
          await event_attendanceRepository.save(newEventAttendance);
         res.status(201).json({
            message: "Event Attendance created succesfully!",
            event_attendance: newEventAttendance
            ,
         });
      } catch (error: any) {
         console.error("Error while creating Event Attendance:", error);
         res.status(500).json({
            message: "Error while creating Event Attendance",
            error: error.message,
         });
      }
   }
   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const event_attendanceRepository = AppDataSource.getRepository(Event_Attendance);
         const event_attendanceUpdated = await event_attendanceRepository.update({ id: id }, data);
         res.status(202).json({
            message: "Event attendance updated successfully!",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating event_attendance",
         });
      }
   }
   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const appointmentRepository = AppDataSource.getRepository(Event_Attendance);
         await appointmentRepository.delete(id);

         res.status(200).json({
            message: "Event attendance deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting event attendance",
         });
      }
   }
}