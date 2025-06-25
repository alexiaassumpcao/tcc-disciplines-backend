import { proccessFile } from "../services/files.js";

export async function processStudentWithFile(req, res, prisma) {
    try {
        const { email, password } = req.body;
        const file = req.files.files[0]
        const fileInfo = await proccessFile(prisma, email, password, getUintArrayFromFileBuffer(file))

        res.status(200).send(JSON.stringify(fileInfo));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}

function getUintArrayFromFileBuffer(file) {
    const fileBuffer = file.buffer
    return new Uint8Array(fileBuffer);
}
