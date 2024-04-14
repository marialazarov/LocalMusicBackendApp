import express from "express";
import { EventController } from "../controllers/EventsController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";


// -----------------------------------------------------------------------------

const router = express.Router();
const eventcontroller= new EventController();

router.get("/", eventcontroller.getAll);
router.get("/:id", eventcontroller.getByArtistId);
router.post("/", eventcontroller.create);
router.patch("/:id", eventcontroller.update);
router.delete("/:id", eventcontroller.delete);
router.get("/miseventos/:id",auth, eventcontroller.getByUserId);


export default router;