import express from "express";
import { batchQuestions, createPreference, deletePreference, getPreference, getPreferenceById, listPreferenceQuestions, updatePreference, testList } from '../controllers/preferences.js';
import { authenticateToken } from "../authMiddleware.js";

const router = express.Router();

export default (prisma) => {
    router.post("/", (req, res) => {
        createPreference(req, res, prisma)
    })
    router.get("/", (req, res) => {
        getPreference(req, res, prisma)
    })
    router.post("/questions", (req, res) => {
        batchQuestions(req, res, prisma)
    })
    router.get("/questions", authenticateToken, (req, res) => {
        listPreferenceQuestions(req, res, prisma)
    })
    router.get("/:id", authenticateToken, (req, res) => {
        getPreferenceById(req, res, prisma)
    })
    router.patch("/:id", (req, res) => {
        updatePreference(req, res, prisma)
    })
    router.delete("/:id", (req, res) => {
        deletePreference(req, res, prisma)
    })
    return router
}
