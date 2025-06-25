export class User{
    constructor(name, email, password) {
        this.id = crypto.randomUUID() // UUID
        this.name = name // String
        this.email = email // String
        this.password = password // String
    }
}

export class Student extends User {
    constructor(name, email, password, code, course) {
        super(name, email, password)
        this.code = code // String
        this.course = course // String
        this.preferenceId = null; // UUID
    }
}

export class Cordinator extends User {
    constructor(name, email, password) {
        super(name, email, password)
    }
}

export class Preference {
    constructor(name, disciplinesIds) {
        this.id = crypto.randomUUID() // UUID
        this.name = name // String
        this.disciplinesIds = disciplinesIds // []UUID
    }
}

export class SelectedDiscipline {
    constructor(studentId, disciplineId) {
        this.id = crypto.randomUUID() // UUID
        this.studentId = studentId
        this.disciplineId = disciplineId
    }
}
class SelectedDisciplinePost {
    constructor(disciplineId, wasRecommended) {
        this.wasRecommended = wasRecommended // bool
        this.disciplineId = disciplineId
    }
}
export class Discipline {
    constructor(name, code, area, category) {
        this.id = crypto.randomUUID() // UUID
        this.name = name // String
        this.code = code // []String
        this.area = area // String
        this.category =  category // String
    }
}

export class DisciplineCompleted {
    constructor(disciplineId, studentId, note, situation) {
        this.id = crypto.randomUUID() // UUID
        this.disciplineId = disciplineId // UUID
        this.studentId = studentId // UUID
        this.note = note // double
        this.situation =  situation // String
    }
}

export class PreferenceQuestion {
    constructor(text, uniqueName, options, questionType, rate) {
        this.id = crypto.randomUUID() // UUID
        this.text = text // string
        this.uniqueName = uniqueName // string
        this.options = options // jsonb(PreferenceQuestionOption) -> { label: string, preference_value: preferenceId }
        this.questionType =  questionType // String -> enum: MULTI_OPTION, ONE_OPTION
        this.rate = rate // string -> enum: POSITIVE, NEGATIVE, NEUTRAL
    }
}

export class PreferenceQuestionOption {
    constructor(label, preferenceValue) {
        this.label = label // string
        this.preferenceValue = preferenceValue // UUID -> PreferenceId
    }
}

export class PreferencesSelected {
    constructor(
        studentId,
        total,
        recommended,
        personal, percentageOfCorrect) {
        this.id = crypto.randomUUID() // UUID
        this.studentId = studentId
        this.total = total
        this.recommended = recommended
        this.personal = personal
        this.percentageOfCorrect = percentageOfCorrect
    }
}
export class PreferenceQuizResponse {
    constructor(
        uniqueName,
        rate,
        selectedOptions,
    ) {
        this.uniqueName = uniqueName // string
        this.rate = rate // string
        this.selectedOptions = selectedOptions // []PreferenceQuestionOption
    }
}

class UserDto {
    constructor(student, disciplinesCompleted, preference) {
        this.student = student // Disciplina
        this.disciplinesCompleted = disciplinesCompleted // []DisciplinaCursada
        this.preference = preference // Preferencia
    }
}

export const SITUACAO_VALUES = [
    "APR", // Aluno aprovado com média maior ou igual a 5,0.
    "APRN", // Aluno com média entre 5,0 e 5,0 e nota mínima superior a 0,0 após a substituição.

    "REP", // Aluno com média inferior a 5,0.
    "REPF", // Reprovado por falta
    "REPMF", // Reprovado por média e falta
    "REPN", // Reprovado por nota mínima
    "REPNF", // Reprovado por nota e falta 

    "DISP", // Aproveitou o componente e foi dispensado.
    "MATRICULADO", // Matriculado na turma
    "TRANS", // Fez o componente em outra instituição e aproveitou na Instituição.
    "REC", // Aluno que fará reposição.
    "INCORP", // Fez o componente durante mobilidade estudantil.
    "CUMPRIU", // Cumpriu Fez o componente na UFRRJ em outro curso anterior e aproveitou no curso atual.

    "CANC", // Matrícula em turma cancelada.
    "TRANCADO", // Matrícula em turma trancada.    
]

// aprovados
export const SITUATION_APPROVED_VALUES = SITUACAO_VALUES.slice(0, 1)

// reprovado
const VALORES_REPROVADOS = SITUACAO_VALUES.slice(2,6)

// fez o componente porem nao conta a nota
const VALORES_SEM_NOTA = SITUACAO_VALUES.slice(7, 12)

// é como nao tivesse feito a materia
const VALORES_QUE_NAO_CONTAM = SITUACAO_VALUES.slice(13, 14)
