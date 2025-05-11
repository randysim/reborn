type GoalDifficulty = "EASY" | "NORMAL" | "HARD" | "INSANE"

interface Goal {
    id: Number
    title: String
    description: String
    completed: Boolean
    createdAt: String
    difficulty: GoalDifficulty
}

interface GoalRequest {
    title: String
    description: String
    difficulty: GoalDifficulty
}