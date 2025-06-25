import { getRecommendsDisciplinesByStudentId } from "../services/recommends.js";

export async function recommends(req, res, prisma) {
    const { studentId } = req.query;
    try {
        const result = await getRecommendsDisciplinesByStudentId(prisma, studentId)
        res.status(202).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }  
}