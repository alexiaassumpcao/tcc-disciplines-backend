import { getApprovedDiciplinesCompleted, getDisciplines, getDisciplinesByAreaWithExcludes, getDisciplinesOfAreas } from "./disciplines.js";
import { getPreferenceDisciplinesWithExcludes } from "./preferences.js";
import { getStudentById } from "./users.js";

export async function getRecommendsDisciplinesByStudentId(prisma, studentId) {
    const resultObj = {}
    const student = await getStudentById(prisma, studentId)
    // primeiro passo: recomendação por perfil de preferencia
    const approvedDisciplinesCompleted = await getApprovedDiciplinesCompleted(prisma, studentId)
    const ids = reduceForIdsList(approvedDisciplinesCompleted)
    const preferenceId = student.preferenceId
    if (preferenceId !== undefined) {
        const resultByPreference = await getPreferenceDisciplinesWithExcludes(prisma, preferenceId, ids)
        resultObj["recommendByPreferencePerfil"] = resultByPreference
    }

    // segundo passo: recomenda por nota em area
    const resultByArea = await recommendByNote(prisma, ids, approvedDisciplinesCompleted)
    resultObj["recommendByArea"] = resultByArea
    return resultObj
}


async function recommendByNote(prisma, ids, approvedDisciplinesCompleted) {
    let disciplines = await getDisciplines(prisma, ids) // []Disciplina

    let disciplinesByArea = divideDisciplinesByArea(disciplines, approvedDisciplinesCompleted) // { "Eng de Software": []DisciplinaCursada }

    let mediasByArea = calculateMedia(disciplinesByArea) // { "Eng de Software": 2,5, [...] }
    let sortedMediasByArea = sortAreaByMedia(mediasByArea) // [{ "Eng de Software": 2,5 }]

    let listOfAreas =  sortedMediasByArea.map((a) => {
        return a.area
    })

    const re = await getDisciplinesOfAreas(prisma, listOfAreas, ids)
    return re
}

function reduceForIdsList(list) {
    return list.map((item) => {
        return item.disciplineId
    })
}

function selectDiscipline(disciplineId, disciplinesApproved) {
    return disciplinesApproved.find((discipline) => discipline.disciplineId == disciplineId) // DisciplinaCursada
}

function divideDisciplinesByArea(disciplines, disciplinesWithNote) {
    let result = new Object()
    disciplines.map((discipline) => {
        let keys = Object.keys(result)
        if (keys.includes(discipline.area)) {
            result[discipline.area].push(selectDiscipline(discipline.id, disciplinesWithNote))
        } else {
            result[discipline.area] = []
            result[discipline.area].push(selectDiscipline(discipline.id, disciplinesWithNote))
        }
    })
    return result
}

function calculateMedia(disciplinesByArea) {
    let result = new Object()
    let areaOfDisciplines = Object.keys(disciplinesByArea)
    areaOfDisciplines.map((area) => {
        result[area] = calculateMediaOfArea(disciplinesByArea[area])
    })
    return result
}

function calculateMediaOfArea(disciplines) {
    let allDisciplines = disciplines.length
    let initial = 0;
    return (disciplines.reduce((total, discipline) => total + discipline.note, initial))/allDisciplines
}

function sortAreaByMedia(mediasByArea) {
    let disciplinesAreas = Object.keys(mediasByArea)

    const result = disciplinesAreas.map((area) => {
        return {area: area, media: mediasByArea[area]}
    })
    return result.sort(function(a, b) {
        return b.media - a.media;
    });
}
