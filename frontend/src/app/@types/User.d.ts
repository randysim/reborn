interface AuthUser {
    id: number
    username: string
    email: string
    picture: string
    birthDate?: string
    createdAt: string
    onboarded: boolean
    timezone: string
    strength: number
    wealth: number
    intelligence: number
    aura: number
    coins: number
    cheatDays: number
    fitnessSchedule: number[]
    fitnessScheduleCompleted: boolean[]
}

interface User {
    id: number
    username: string
    picture: string
}

interface UserUpdateRequest {
    timezone: string
    username: string
    birthDate: string
}