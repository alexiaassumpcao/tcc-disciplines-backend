import { DisciplineCompleted, SITUACAO_VALUES, Student } from "../models.js";
import  { readPdfPages } from 'pdf-text-reader';

export async function proccessFile(prisma, userEmail, userPassword, fileUnitArray) {
    const filePages = await getFilePages(fileUnitArray)
    let stdId;
    let disciplines = []
    let user;
    for (let pageIndex = 0; pageIndex < filePages.length; pageIndex++) {
        if (pageIndex == 0) {
            const { user: userFromResponse, disciplines: firstDisciplines} = await readPageOne(prisma, filePages[pageIndex], userEmail, userPassword)
            stdId = userFromResponse?.id
            disciplines.push(...firstDisciplines)
            user = userFromResponse
        } else {
            const { disciplinesToReturn, shouldEnd } = await readPages(prisma, filePages[pageIndex].lines, stdId)
            disciplines.push(...disciplinesToReturn)
            if (shouldEnd) {
                break;
            }
        }
    }

    return {
        user: user,
        disciplines: disciplines
    }
}

async function readPageOne(prisma, page, userEmail, userPassword) {
    const student = readPersonalData(page.lines, userEmail, userPassword)
    const disciplines = await readFirstPageDisciplines(prisma, page.lines, student.id)
    return {
        user: student,
        disciplines: disciplines
    }
}
async function readFirstPageDisciplines(prisma, lines, studentId) {
    const componentsCursedLabel = "Componentes Curriculares Cursados/Cursando"
    const endOfPageLabel = "Para verificar a autenticidade deste documento entre em https://sigaa.ufrrj.br/sigaa/documentos/ informando a"
    const disciplines = lines.slice(lines.indexOf(componentsCursedLabel) + 1, lines.indexOf(endOfPageLabel))
    const inep = "Conforme Relatório do INEP"
    const a = "DATA DA PROVA"
    const onlyDisciplines = disciplines.filter((d) => (!d.includes(inep) && !d.includes(a)))
    const disciplineCodeLabels = ["AA", "IM", "TM", "TN"]
    let codes = []
    const k = onlyDisciplines.map((d, index) => {
        const isATeacherName = d.includes("h)")
        if (isATeacherName) {
            const infos = onlyDisciplines[index-1].split(" ")
            
            const disc =  {
                name: onlyDisciplines[index-2],
                code: infos.map((b) => {
                    if (containsAny(b, disciplineCodeLabels)) {
                        return b
                    }
                }).filter((code) => code !== undefined)[0],
                situation: infos.map((b) => {
                    if (containsAny(b, SITUACAO_VALUES)) {
                        return b
                    }
                }).filter((code) => code !== undefined)[0],
                note: infos.map((b, jindex) => {
                    if (containsAny(b, SITUACAO_VALUES)) {
                        return infos[jindex-4]
                    }
                }).filter((code) => code !== undefined)[0],
            }
            codes.push(disc.code)
            return disc   
        }
    }).filter((c) => c !== undefined)
    const nDisciplines = await prisma.Discipline.findMany({
        where: {
            code: {
                hasSome: codes
            }
        }
    }) 
    const disciplinesToReturn = nDisciplines.map((disc) => {
        const l = k.map((k_zin) => {
            if (disc.code == k_zin.code) {
                return new DisciplineCompleted(
                    disc.id, studentId, k_zin.note, k_zin.situation,
                )
            }
        }).filter((d) => d !== undefined)[0]
        return l
    }).filter((d) => d !== undefined)
    return disciplinesToReturn
}
function discFind(discDB) {
    return 
}

async function getFilePages(fileUnitArray) {
    return await readPdfPages({data: fileUnitArray});
} 

function readPersonalData(lines, userEmail, userPassword) {
    const personalDataLabel = "Dados Pessoais"
    const nameLabel = "Nome: "
    const codeLabel = "Matrícula: "
    const courseLabel = "Curso: "

    if (lines.includes(personalDataLabel)) {
        const startIndexOfPersonalData = lines.indexOf(personalDataLabel)
        const personalData = lines.slice(startIndexOfPersonalData, startIndexOfPersonalData+10)
        const name = personalData.map((data) => {
            if (data.includes(nameLabel)) {
                return data.split(nameLabel)[1]
            }
        }).filter((name) => name !== undefined)[0]

        const studentCode = personalData.map((data) => {
            if (data.includes(codeLabel)) {
                return data.split(codeLabel)[1]
            }
        }).filter((code) => code !== undefined)[0]


        const studentCourse = personalData.map((data) => {
            if (data.includes(courseLabel)) {
                return data.split(courseLabel)[1]
            }
        }).filter((course) => course !== undefined)[0]
        return new Student(
            name, 
            userEmail,
            userPassword,
            studentCode,
            studentCourse,
        )
    }
    return null
}

async function readPages(prisma, lines, studentId) {
    const endOfPageLabel = "Para verificar a autenticidade deste documento entre em https://sigaa.ufrrj.br/sigaa/documentos/ informando a"
    const final = "Legenda"
    const shouldEnd = lines.filter((l) => l.includes(final)).length > 0
    const inep = "Conforme Relatório do INEP"
    const a = "DATA DA PROVA"

    const disciplines = lines.slice(17, lines.indexOf(shouldEnd ? final : endOfPageLabel))
    const onlyDisciplines = disciplines.filter((d) => (!d.includes(inep) && !d.includes(a) && !d.includes(final)))
    const disciplineCodeLabels = ["AA", "IM", "TM", "TN"]
    let codes = []
    const k = onlyDisciplines.map((d, index) => {
        const isATeacherName = d.includes("h)")
        if (isATeacherName) {
            const infos = onlyDisciplines[index-1].split(" ")
            
            const disc =  {
                name: onlyDisciplines[index-2],
                code: infos.map((b) => {
                    if (containsAny(b, disciplineCodeLabels)) {
                        return b
                    }
                }).filter((code) => code !== undefined)[0],
                situation: infos.map((b) => {
                    if (containsAny(b, SITUACAO_VALUES)) {
                        return b
                    }
                }).filter((code) => code !== undefined)[0],
                note: infos.map((b, jindex) => {
                    if (containsAny(b, SITUACAO_VALUES)) {
                        return infos[jindex-4]
                    }
                }).filter((code) => code !== undefined)[0],
            }
            codes.push(disc.code)
            return disc   
        }
    }).filter((c) => c !== undefined)
    const filteredCodes = codes.filter((c) => c !== undefined)
    const nDisciplines = await prisma.Discipline.findMany({
        where: {
            code: {
                hasSome: filteredCodes
            }
        }
    }) 
    const disciplinesToReturn = nDisciplines.map((disc) => {
        const l = k.map((k_zin) => {
            if (disc.code == k_zin.code) {
                return new DisciplineCompleted(
                    disc.id, studentId, k_zin.note, k_zin.situation,
                )
            }
        }).filter((d) => d !== undefined)[0]
        return l
    }).filter((d) => d !== undefined)
    return {
        disciplinesToReturn, shouldEnd
    }
}
function containsAny(str, arr) {
    return arr.some(item => str.includes(item));
  }