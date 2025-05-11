interface FitnessRoutine {
    id: String
    title: String
    description: String
}

interface FitnessRoutineRequest {
    title: String
    description: String
}

interface FitnessRoutineCompleteRequest {
    day: Number
    completed: Boolean
}

interface FitnessRoutineSetRequest {
    day: Number
}