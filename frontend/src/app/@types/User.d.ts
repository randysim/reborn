interface AuthUser {
    id: Number
    username: String
    email: String
    picture: String
    birthDate?: String
    createdAt: String
    onboarded: Boolean
    timezone: String
    strength: Number
    wealth: Number
    intelligence: Number
    aura: Number
    coins: Number
    cheatDays: Number
    fitnessSchedule: Number[]
    fitnessScheduleCompleted: Boolean[]
}

interface User {
    id: Number
    username: String
    picture: String
}