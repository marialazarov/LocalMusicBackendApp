import express from "express";
import userRoutes from "./routes/users.routes";
import eventRoutes from './routes/events.routes'
import  authRoutes from "./routes/auth.routes"
import artistRoutes from "./routes/artists.routes"
 

// -----------------------------------------------------------------------------

const router = express.Router();

// User routes
router.use("/api/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/api/artist", artistRoutes);
router.use("/api/events", eventRoutes);


export default router;
