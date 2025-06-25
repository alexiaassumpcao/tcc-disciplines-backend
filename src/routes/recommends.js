import express from "express";
import { recommends } from '../controllers/recommends.js';
import { authenticateToken } from "../authMiddleware.js";

const router = express.Router();

export default (prisma) => {
    router.get("/", authenticateToken, (req, res) => {
        recommends(req, res, prisma)
    })
    return router
}