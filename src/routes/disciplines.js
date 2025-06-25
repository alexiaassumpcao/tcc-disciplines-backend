import express from "express";
import { createDiscipline, getDisciplineById, getDisciplines, selectedDisciplines, updateDiscipline } from '../controllers/disciplines.js';
import { authenticateToken } from "../authMiddleware.js";

const router = express.Router();

export default (prisma) => {
    router.post("/", (req, res) => {
        createDiscipline(req, res, prisma)
    })
    router.get("/", authenticateToken, (req, res) => {
        getDisciplines(req, res, prisma)
    })
    router.post("/selected", authenticateToken, (req, res) => {
        selectedDisciplines(req, res, prisma)
    })
    router.get("/selected", authenticateToken, (req, res) => {
        testList(req, res, prisma)
    })
    router.get("/:id", (req, res) => {
        getDisciplineById(req, res, prisma)
    })
    router.patch("/:id", (req, res) => {
        updateDiscipline(req, res, prisma)
    })
    router.delete("/:id", (req, res) => {
        deleteById(req, res, prisma)
    })
    return router
}
