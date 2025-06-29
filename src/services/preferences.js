export async function getById(prisma, id) {
    const result = await prisma.Preference.findUnique({
        where: {
           id: id,
        },
    })
    return result
}

export async function getByName(prisma, name) {
    const result = await prisma.Preference.findUnique({
        where: {
           name: name,
        },
    })
    return result
}

export async function update(prisma, id, toUpdate) {
    const result = await prisma.Preference.update({
        where: {
           id: id,
        },
        data: toUpdate,
    })
    return result
}
 
export async function create(prisma, newPreference) {
    const result = await prisma.Preference.create({
        data: newPreference,
    })
    return result
}

export async function deleteById(prisma, id) {
    const result = await prisma.Preference.update({
        where: {
           id: id,
        },
        data: {
            deletedAt: new Date.now(),
        },
    })
    return result
}

export async function list(prisma) {
    const result = await prisma.Preference.find()
    return result
}


export async function listQuestions(prisma) {
    const result = await prisma.PreferenceQuestion.findMany()
    return result
}

export async function createManyQuestions(prisma, questions) {
    const result = await prisma.PreferenceQuestion.createMany({
        data: questions,
    })
    return result
}


export function validateUserResponse(responses) {
    const onlyPositiveAndNeutral = filterPositiveAndNeutralResponses(responses)
    const sorted = countPreferences(onlyPositiveAndNeutral)
    if (sorted.length == 0) {
        return undefined
    }

    return sorted[0].preference
}


function filterPositiveAndNeutralResponses(responses) {
    return responses.filter((response) => {
        return response.rate !== "NEGATIVE"
    })
}

function countPreferences(responses) {
    const selectedOptions = []
    responses.map((response) => {
        selectedOptions.push(...response.selectedOptions)
    })
    const totalByPreference = selectedOptions.map((option) => {
        const preferenceId = option.preferenceValue
        return {
            preferenceId: preferenceId,
            total: selectedOptions.reduce((total, item) => (item.preferenceValue == preferenceId ? total+1 : total), 0)
        }
    })
    return sortByTotal(totalByPreference)
}

function sortByTotal(totalByPreferencePerfil) {
    const totalByPreferencePerfilNoEmpty = totalByPreferencePerfil.filter((perfil) => {
        return perfil.preferenceId !== ''
    })
    let preferences = Object.keys(totalByPreferencePerfilNoEmpty)

    const result = preferences.map((preference) => {
        return {preference: totalByPreferencePerfilNoEmpty[preference].preferenceId, total: totalByPreferencePerfilNoEmpty[preference].total}
    })
    return result.sort(function(a, b) {
        return b.total - a.total;
    });
}

export async function getPreferenceDisciplinesWithExcludes(prisma, preferenceId, disciplinesToExclude) {
    const a = await prisma.Preference.findMany({
        where: {
            id: preferenceId,
        },
        include: {
            disciplines: {
                where: {
                  id: {
                    notIn: disciplinesToExclude,
                  }
                }
          },
        }
      })
      return a
}