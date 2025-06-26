import { Prisma } from "@prisma/client"
import { createManyCompletedDisciplines } from "./disciplines.js"
import { validateUserResponse } from "./preferences.js"
import bcrypt from "bcryptjs"

export async function createStudent(prisma, student, completedDisciplines) {
    const hashPassword = await bcrypt.hash(student.password, 8);
    const user = await prisma.User.create({
        data: {
            email: student.email,
            name: student.name,
            password: hashPassword,
        },
      })
    const std = await prisma.Student.create({
        data: {
            id: student.id,
            userId: user.id,
            code: student.code,
            course: student.course,
        }
    })
    await createManyCompletedDisciplines(prisma, std.id, completedDisciplines)
    return std
}

export async function isInUse(prisma, email, code) {
    if (email !== undefined) {
        const result = await prisma.User.findUnique({
            where: {
                email: email
            }
        })
        return result !== null
    }
    if (code !== undefined) {
        const result = await prisma.Student.findUnique({
            where: {
                code: code,
            }
        })
        return result !== null
    }
    return false
}

export async function createCordinator(prisma, cordinator){
    console.log("Not implemented!")
}

 
export async function list(prisma, filters) {
    const result = await prisma.User.findMany({
        where: convertToWhereQuery(filters)
    })
    return result
 }
 
 /*
 {
     area: "Eng"
 }
 
 */
function convertToWhereQuery(filters) {
    const whereQuery = {}
    const fields = Object.keys(filters)
    fields.map((field) => {
        whereQuery[field] = {
            equals: filters[field]
        }
    })
    whereQuery.deletedAt = {
        equals: null
    }
    return whereQuery
}
 
export async function update(prisma, id, toBeUpdated) {
    const u = await prisma.User.update({
        where: {
           id: id,
        },
        data: toBeUpdated,
    })
    return u
}

export async function updateUserStudent(prisma, userId, studentId, toBeUpdated) {
    const s = await prisma.Student.update({
        where: {
          id: studentId,
        },
        data: {
            code: toBeUpdated.code ?? Prisma.skip,
            course: toBeUpdated.course ?? Prisma.skip,
        },
    })
    const u = await prisma.User.update({
        where: {
          id: userId,
        },
        data: {
            name: toBeUpdated.name ?? Prisma.skip,
            email: toBeUpdated.email ?? Prisma.skip,
        },
    })
    return s
}

 
export async function getById(prisma, id) {
    const result = await prisma.User.findUnique({
        where: {
           id: id,
        },
    })
    return result
}
 
 export async function getStudentById(prisma, id) {
    const result = await prisma.Student.findUnique({
        where: {
          id: id,
        },
        include: {
            preference: true,
            user: true,
        }
    })
    return result
}


export async function getCordinatorById(prisma, id) {
    const result = await prisma.Cordinator.findUnique({
        where: {
          id: id,
        }
    })
    return result
}


export async function deleteById(prisma, userId) {
    await prisma.User.update({
        where: {
           id: userId,
        },
        data: {
            deletedAt: new Date.now(),
        },
    })
    await prisma.Student.update({
        where: {
          userId: userId,
        },
        data: {
            deletedAt: new Date.now(),
        },
    })
    await prisma.Cordinator.update({
        where: {
          userId: userId,
        },
        data: {
            deletedAt: new Date.now(),
        },
    }) 
}

export async function validateAuth(prisma, email, password) {
    try {
        const auth = await prisma.User.findUnique({
            where: {
                email: email,
              },
        })
        const isTheCorrectPassword = await bcrypt.compare(password, auth.password)
        if (isTheCorrectPassword) {
            const student = await prisma.Student.findMany({
                where: {
                    userId: auth.id,
                },
                include: {
                    user: true,
                    preference: true
                }
            })
            return student[0]
        } else {
            return undefined
        }
    }  catch(e) {
        return e
    }
}

export async function editPreference(prisma, userId, preferenceQuizResponse) {
    const mostLiked = validateUserResponse(preferenceQuizResponse)
    const a = await prisma.Student.update({
        where: {
            id: userId,
        },
        data: {
            preferenceId: mostLiked, 
        }
    }) 
    return a 
}
