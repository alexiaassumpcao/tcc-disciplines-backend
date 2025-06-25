import express from "express";
import { auth, createUser, editUserPreference, getCordById, getStdById, getUserById, getUsers, updateStudent, updateUser } from '../controllers/users.js';
import { authenticateToken } from "../authMiddleware.js";

const router = express.Router();

export default (prisma) => {
    router.post("/", 
        (req, res) => {
            createUser(req, res, prisma);     
    });
    router.get("/", (req, res) => {
        getUsers(req, res, prisma)
    })
    router.post("/auth", (req, res) => {
        auth(req, res, prisma)
    })
    router.get("/:id", authenticateToken, (req, res) => {
        getUserById(req, res, prisma)
    })
    router.patch("/:id", authenticateToken, (req, res) => {
        updateUser(req, res, prisma)
    })
    router.delete("/:id", (req, res) => {
        deleteById(req, res, prisma)
    })
    router.get("/:id/students/:studentId", (req, res) => {
        getStdById(req, res, prisma)
    })
    router.patch("/:id/students/:studentId", (req, res) => {
        updateStudent(req, res, prisma)
    })
    router.get("/:id/cordinators/:cordinatorId", (req, res) => {
        getCordById(req, res, prisma)
    })
    router.patch("/:id/preferences", authenticateToken, (req, res) => {
        editUserPreference(req, res, prisma)
    }) 
    return router  
}