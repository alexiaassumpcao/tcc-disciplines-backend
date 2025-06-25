import multer from 'multer';
import express from "express";
import { processStudentWithFile } from '../controllers/files.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

export default (prisma) => {
    router.post("/", upload.fields([
        { name: 'files', maxCount: 1 },
        { name: 'email', maxCount: 1 },
        { name: "password", maxCount: 1 }
    ]), (req, res) => {
        processStudentWithFile(req, res, prisma)
    });
    return router
};
