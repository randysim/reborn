interface FitnessRoutine {
    id: number
    title: string
    description: string
}

interface FitnessRoutineRequest {
    title: string
    description: string
}

interface FitnessRoutineCompleteRequest {
    day: number
    completed: boolean
}

interface FitnessRoutineSetRequest {
    id: number
    day: number
}