import { Request, Response } from "express";
import { Events } from "../models/Events";

import { Controller } from "./Controller";
import {  CreateEventsRequestBody } from "../types/types";
import { AppDataSource } from "../data-source";



//----------------------------------------------------------------------

export class EventController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const eventsRepository = AppDataSource.getRepository(Events);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allEvents, count] = await eventsRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               id: true,
               user_id: true,
               artist_id: true,
               date: true,
               location: true,
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allEvents
            ,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting events",
         });
      }
   }
   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {

         const id = +req.params.id;
         const eventsRepository = AppDataSource.getRepository(Events);
         const events
          = await eventsRepository.findOneBy({
            user_id: id,
         });

         if (!events
            ) {
            return res.status(404).json({
               message: "Event not found",
            });
         }

         res.status(200).json(events
            );
      } catch (error) {
         res.status(500).json({
            message: "Error while getting events",
         });
      }
   }

  
  




   async getByArtistId(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const eventsRepository = AppDataSource.getRepository(Events);
         const events = await eventsRepository
         .findBy({
            artist_id: id,
         });

         if (!events) {
            return res.status(404).json({
               message: "Event not found",
            });
         }

         res.status(200).json(events);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting events",
         });
      }
   }
   async getByUserId(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const eventsRepository = AppDataSource.getRepository(Events);
         const events = await eventsRepository.findBy({
            user_id: id,
         });

         if (!events) {
            return res.status(404).json({
               message: "Event not found",
            });
         }

         res.status(200).json(events);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting appointments",
         });
      }
   }

   async create(
      req: Request<{}, {}, CreateEventsRequestBody>,

      res: Response
   ): Promise<void | Response<any>> {
      const { user_id , artist_id, date, location} = req.body;

      const eventsRepository= AppDataSource.getRepository(Events);
      try {
         const newEvent: Events
          = {
            user_id,
            artist_id,
            date,
            location,
                
         }
          await eventsRepository.save(newEvent
            );
         res.status(201).json({
            message: "Event  created succesfully!",
            event: newEvent
            ,
         });
      } catch (error: any) {
         console.error("Error while creating Event:", error);
         res.status(500).json({
            message: "Error while creating Event",
            error: error.message,
         });
      }
   }
   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const eventsRepository = AppDataSource.getRepository(Events);
         const eventtUpdated = await eventsRepository.update({ id: id }, data);
         res.status(202).json({
            message: "Event updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating event",
         });
      }
   }
   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const eventsRepository = AppDataSource.getRepository(Events);
         await eventsRepository.delete(id);

         res.status(200).json({
            message: "Event deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting event",
         });
      }
   }


}