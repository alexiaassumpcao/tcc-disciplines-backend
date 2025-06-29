import { PreferencesSelected, SelectedDiscipline, SITUATION_APPROVED_VALUES } from "../models.js";
import disciplines from "../routes/disciplines.js";


export async function create(prisma, newDiscipline) {
   const d = await prisma.Discipline.create({
    data: newDiscipline,
   })
   return d;
}


export async function list(prisma, filters) {
    if (filters.name !== undefined) {
        return await prisma.Discipline.findMany({
            where: {
                name: {
                    contains: filters.name
                },
                deletedAt: null,
            },
            include: {
                preferences: true,
            }
        })
    } else {
        return await prisma.Discipline.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                preferences: true,
            }
        })
    }
}

/*
{
    area: "Eng"
}

*/
function convertToWhereQuery(filters) {
    const whereQuery = {}
    const fields = Object.keys(filters)
    for (let index = 0; index < fields.length; index++) {
        whereQuery[fields[index]] = {
            contains: filters[fields[index]]
        }
    }
    return whereQuery
}

export async function update(prisma, id, toBeUpdated) {
    const u = await prisma.Discipline.update({
        where: {
          id: id,
        },
        data: toBeUpdated,
    })
    return u
}

export async function getById(prisma, id) {
    const result = await prisma.Discipline.findUnique({
        where: {
          id: id,
        },
    })
    return result
}

export async function deleteById(prisma, id) {
    return await prisma.Discipline.update({
        where: {
          id: id,
        },
        data: {
            deletedAt: new Date.now(),
        },
    })
    
}

export async function createManyCompletedDisciplines(prisma, studentId, completedDisciplines){
    if (completedDisciplines.length > 0) {
        const real = parseNoteFromStringToFloat(studentId, completedDisciplines)
        return await prisma.DisciplineCompleted.createMany({
            data: real,
            skipDuplicates: true,
          })
    }
    return null
}

function parseNoteFromStringToFloat(studentId, completedDisciplines) {
    return completedDisciplines.map((c) => {
        c.studentId = studentId
        c.note = parseFloat(c.note)
        return c
    })
}

export async function getApprovedDiciplinesCompleted(prisma, studentId) {
    const result = await prisma.DisciplineCompleted.findMany({
        where: {
            studentId: studentId,
            situation: {
                in: SITUATION_APPROVED_VALUES,
            }
        }
    })
    return result;
}


export async function getDisciplines(prisma, disciplinesIds) {
    const a = await prisma.Discipline.findMany({
        where: {
            id: {
                in: disciplinesIds
            }
        },
        include: {
            preferences: true,
        }
    })
    return a
}

export async function getDisciplinesByAreaWithExcludes(prisma, area, disciplinesToExclude) {
    return await prisma.Discipline.findMany({
        where: {
            area: area,
        },
        relationLoadStrategy: 'join', // or 'query'
        include: {
            disciplines: {
              where: {
                id: {
                    notIn: disciplinesToExclude,
                }
              },
            },
          },
      })
}


export async function getDisciplinesOfAreas(prisma, listOfAreas, disciplinesToExclude) {
    const r = await prisma.Discipline.findMany({
        where: {
            area: {
                in: listOfAreas
            },
            id: {
                notIn: disciplinesToExclude
            }
        }
      })

      
      return r
}

export async function  saveSelectedDisciplines(prisma, studentId, requestData) {
    const { selectedDisciplines, auditData } = parseToArrayOfSelectedDisciplines(studentId, requestData)
    await prisma.PreferencesSelected.create(
        {
            data: auditData,
    })
    const selectedDisciplinesIds = getDisciplinesIds(selectedDisciplines)
    const selected = await prisma.DisciplinesSelected.findMany({
        where: {
            disciplineId: {
                in: selectedDisciplinesIds,
            },
            studentId: {
                equals: studentId,
            }
        }
    })
    if (selected?.length === 0 || selected == null) {
        return await prisma.DisciplinesSelected.createMany({
            data: selectedDisciplines,
        })
    } else {
        const selectedOnlyIds = getDisciplinesIds(selected)
        const shouldBeInsert = selectedDisciplines.filter((m) => !selectedOnlyIds.includes(m.disciplineId))
        return await prisma.DisciplinesSelected.createMany({
            data: shouldBeInsert,
        })
    }
}

function getDisciplinesIds(selectedDisciplines) {
    return selectedDisciplines.map((d) => {
        return d.disciplineId
    })
}

function parseToArrayOfSelectedDisciplines(studentId, requestData) {
    const totalSelected = requestData.length
    let totalRecommended = 0
    let totalPersonalChoice = 0
    let newArray = []

    for (let index = 0; index < requestData.length; index++) {
        if (requestData[index].wasRecommended == true) {
            totalRecommended = totalRecommended + 1
        } else {
            totalPersonalChoice = totalPersonalChoice + 1
        }

        const std = new SelectedDiscipline(
            studentId,
            requestData[index].disciplineId,
        )
        newArray.push(std)
    }

    const percentage = (totalRecommended/totalSelected)*100

    const auditData = new PreferencesSelected(
        studentId,
        totalSelected,
        totalRecommended,
        totalPersonalChoice,
        percentage,
    )


    return {
        selectedDisciplines: newArray,
        auditData: auditData,
    }
}


export async function getStudentsSelectedDisciplines(prisma, studentId) {
    const disciplines = await prisma.DisciplinesSelected.findMany({
        where: {
            studentId: studentId,
            deletedAt: null,
        },
    })
    const disciplinesIds = getDisciplinesIds(disciplines)
    return await getDisciplines(prisma, disciplinesIds)
}

// deprecated
export async function listSelectedDisciplines(prisma, studentId) {
    let whereQuery = {
        where: {
            deletedAt: {
                equals: null
            }
        },
        include: {
            discipline: true,
        }
    }
    if (studentId !== undefined && studentId !== "" && studentId !== null) {
        whereQuery = {
            where: {
                deletedAt: {
                    equals: null
                },
                studentId: {
                    equals: studentId
                }
            },
            include: {
                discipline: true,
            }
        }
    }
    const result = await prisma.DisciplinesSelected.findMany({
        where:{
            studentId: {
                equals: studentId
            }
        }
    })
    const onlyDisciplinesIds = result?.map((r) => {
        return r?.disciplineId
    })
    const resultDisciplines = await prisma.Discipline.findMany({
        where:{
            id: {
                in: onlyDisciplinesIds
            }
        }
    })
    const resultFormated = result?.map((s) => {
        const discipline = resultDisciplines.filter((f) => f?.id === s?.disciplineId)[0]
        return {
            selectedId: s?.id,
            studentId: s?.studentId,
            disciplineId: s?.disciplineId,
            disciplineName: discipline?.name,
            disciplineCode: discipline?.code[0],
        }
    })
    return resultFormated
}