type TaskDifficulty = "EASY" | "NORMAL" | "HARD"
type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

interface TaskRequest {
    description: string
    recurring: number
    dueDate: string
    difficulty: TaskDifficulty
    priority: TaskPriority
}

interface Task {
    id: number
    description: string
    completed: boolean
    priority: TaskPriority
    difficulty: TaskDifficulty
    dueDate: string
    createdAt: string
    recurring: number
}