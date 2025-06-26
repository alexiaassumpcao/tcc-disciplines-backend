import { Preference, PreferenceQuestion } from "../models.js";
import { create, createManyQuestions, deleteById, getById, getByName, list, listQuestions, listSelectedDisciplines, update } from "../services/preferences.js";

export async function getPreferenceById(req, res, prisma) {
    const { id } = req.params;
    try {
        const result = await getById(prisma, id)
        
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function getPreference(req, res, prisma) {
    const { name } = req.query;
    try {
        let result;
        if (name) {
            result = await getByName(prisma, name);
        } else {
            result = await list(prisma)
        }
        
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function updatePreference(req, res, prisma) {
    const { id } = req.params;
    try {
        const requestData = req.body;
        const result = await update(prisma, id, requestData)
        
        res.status(202).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function createPreference(req, res, prisma) {
    try {
        const requestData = req.body;
        const result = await create(prisma, requestData)
        
        res.status(201).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function deletePreference(req, res, prisma) {
    const { id } = req.params;
    try {
        const result = await deleteById(prisma, id)
        
        res.status(204).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function listPreferenceQuestions(req, res, prisma) {
    try {
        const result = await listQuestions(prisma)
        res.status(200).send(JSON.stringify(result));
    } catch (e) {
        res.status(400).send(JSON.stringify(e))
    }
}


export async function testList(req, res, prisma) {
    const { studentId } = req.query;
    try {
        const result = await listSelectedDisciplines(prisma, studentId)
        res.status(200).send(JSON.stringify(result));
    } catch (e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function batchQuestions(req, res, prisma) {
    try {
        const requestData = req.body;
        const data = parseBodyRequestToQuestions(requestData)
        const result = await createManyQuestions(prisma, data)
        res.status(201).send(JSON.stringify(result));
    } catch (e) {
        res.status(400).send(JSON.stringify(e))
    }
}

function parseBodyRequestToQuestions(bodyRequest) {
    return bodyRequest.map((data) => {
        return new PreferenceQuestion(
            data.text,
            data.uniqueName,
            data.options,
            data.questionType,
            data.rate,
        )
    })
}