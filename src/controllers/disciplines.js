import { create, deleteById, getById, getStudentsSelectedDisciplines, list, saveSelectedDisciplines, update } from "../services/disciplines.js";


export async function createDiscipline(req, res, prisma) {
    try {
        const requestData = req.body;
        const newData = await create(prisma, requestData)

        res.status(201).send(JSON.stringify(newData));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}


export async function getDisciplines(req, res, prisma) {
    const filters = req.query;

    try {
        const result = await list(prisma, filters)
        
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function updateDiscipline(req, res, prisma) {
    try {
        const requestData = req.body;
        const result = await update(prisma, requestData)
        
        res.status(202).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function getDisciplineById(req, res, prisma) {
    const { id } = req.params;
    try {
        const result = await getById(prisma, id)
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function deleteDisciplineById(req, res, prisma) {
    const { id } = req.params;
    try {
        await deleteById(prisma, id)
        
        res.status(204).send('OK');
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function selectedDisciplines(req, res, prisma) {
    try {
        const { studentId } = req.query;
        const requestData = req.body;
        const result = await saveSelectedDisciplines(prisma, studentId, requestData)
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function listSelectedPreferences(req, res, prisma) {
    try {
        const { studentId } = req.query;
        const result = await getStudentsSelectedDisciplines(prisma, studentId)
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}