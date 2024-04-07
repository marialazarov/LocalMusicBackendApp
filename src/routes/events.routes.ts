import express from "express";
import { EventController } from "../controllers/EventsController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";


// -----------------------------------------------------------------------------

const router = express.Router();
const eventcontroller= new EventController();

router.get("/", eventcontroller.getAll);
router.get("/:id", eventcontroller.getById);
router.post("/", eventcontroller.create);
router.patch("/:id", eventcontroller.update);
router.delete("/:id", eventcontroller.delete);
router.get("/miseventos/:id", eventcontroller.getByUserId);


export default router;