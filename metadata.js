

export async function getMetadata(req, res, prisma) {
    try {
        const preferenceNames = await prisma.$queryRaw`SELECT p."name" FROM "Preference" p`
        const disciplinesAreas = await prisma.$queryRaw`SELECT DISTINCT d.area FROM "Discipline" d `
        const result = {
            areas: disciplinesAreas,
            preferences: preferenceNames,
        }
        res.status(200).send(JSON.stringify(result));
    } catch(e) {
        res.status(400).send(JSON.stringify(e))
    }
}
