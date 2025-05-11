type TaskDifficulty = "EASY" | "NORMAL" | "HARD"
type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

interface TaskRequest {
    description: String
    recurring: Number
    dueDate: String
    difficulty: TaskDifficulty
    priority: TaskPriority
}

interface Task {
    id: Number
    description: String
    completed: Boolean
    priority: TaskPriority
    difficulty: TaskDifficulty
    dueDate: String
    createdAt: String
    recurring: Number
}