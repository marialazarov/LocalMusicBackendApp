import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";


// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/getAllPaginated", auth, isAdmin, userController.getAllPaginated);
router.get("/:id",  userController.getById); 
router.post("/", userController.create);
router.patch("/:id", auth, userController.update);
router.delete("/:id", auth, isAdmin, userController.delete);


export default router;
