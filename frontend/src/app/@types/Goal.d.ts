type GoalDifficulty = "EASY" | "NORMAL" | "HARD" | "INSANE"

interface Goal {
    id: number
    title: string
    description: string
    completed: boolean
    createdAt: string
    difficulty: GoalDifficulty
}

interface GoalRequest {
    title: string
    description: string
    difficulty: GoalDifficulty
}