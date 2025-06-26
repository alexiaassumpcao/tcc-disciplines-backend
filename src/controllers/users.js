import { Cordinator } from "../models.js";
import { createCordinator, 
    createStudent, deleteById, editPreference, getById, 
    getCordinatorById, isInUse, list, update, updateUserStudent, validateAuth, getStudentById } from "../services/users.js";
import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken'
const { parsed: envParsed } = configDotenv();

// /users?type=<student or cordinator>
export async function createUser(req, res, prisma) {
    const { type } = req.query;
    const requestData = req.body;
    if (type == "student") {
        const { user, disciplines } = requestData
        if (!/\S+@\S+\.\S+/.test(user.email)) {
            res.status(400).send("Auth: Invalid email!")
            return; 
        }
        const isEmailInUse = await isInUse(prisma, user.email, undefined)
        if (isEmailInUse) {
            res.status(400).send("Create User: Email already in use!")
            return;
        }
        const isCodeInUse = await isInUse(prisma, undefined, user.code)
        if (isCodeInUse) {
            res.status(400).send("Create User: Student Code already in use!")
            return;
        }
        await createStudent(prisma, user, disciplines);
        res.status(200).send(user.name);
        return;
    } else {
        const cordinator = new Cordinator(
            requestData.name,
            requestData.email,
            requestData.password,
        )

        await createCordinator(cordinator)
        res.status(200).send('OK');
        return;
    }
    
}


export async function getUsers(req, res, prisma) {
    const filters = req.query;
    try {
        const result = await list(prisma, filters)
        
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function updateUser(req, res, prisma) {
    const { id } = req.params;
    try {
        const requestData = req.body;
        const result = await update(prisma, id, requestData)
        
        res.status(202).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function updateStudent(req, res, prisma) {
    
    const { id, studentId } = req.params;
    try {
        const requestData = req.body;
        const result = await updateUserStudent(prisma, id, studentId, requestData)
        
        res.status(202).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function getUserById(req, res, prisma) {
    const { id } = req.params;
    const { type } = req.query;
    try {
        let result;
        if (type == "student") {
            result = await getStudentById(prisma, id)
        } else {
            result = await getById(prisma, id)
        }
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function getStdById(req, res, prisma) {
    const { id, studentId } = req.params;
    try {
        const result = await getStudentById(prisma, studentId)
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}
export async function getCordById(req, res, prisma) {
    const { id, cordinatorId } = req.params;
    try {
        const result = await getCordinatorById(prisma, cordinatorId)
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function deleteUserById(req, res, prisma) {
    const { id } = req.params;
    try {
        await deleteById(prisma, id)
        
        res.status(204).send('OK');
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

export async function auth(req, res, prisma) {
    try {
        const requestData = req.body;
        if (!/\S+@\S+\.\S+/.test(requestData.email)) {
            res.status(400).send("Auth: Invalid email!")
            return; 
        }
        const isEmailInUse = await isInUse(prisma, requestData.email, undefined)
        if (!isEmailInUse) {
            res.status(400).send("Auth: Email not in use!")
            return;
        }
        const userAuth = await validateAuth(prisma, requestData.email, requestData.password)
        if (userAuth === undefined) {
            res.status(400).send("Auth: Password or Email is not correct!")
            return;
        }
        const token = jwt.sign({ userId: userAuth.userId}, envParsed.JWT_SECRET_KEY, { expiresIn: '1h' });
        userAuth.authToken = token
        res.status(202).send(JSON.stringify(userAuth));
        return;
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
        return;
    }
}

export async function editUserPreference(req, res, prisma) {
    const { id } = req.params;
    try {
        const requestData = req.body;
        const user = await editPreference(prisma, id, requestData)
        res.status(200).send(JSON.stringify(user));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
    
}