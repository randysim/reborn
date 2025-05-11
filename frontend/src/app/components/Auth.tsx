'use client'
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../lib/constants"
import Loading from "./Loading";

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

interface UserContextType {
    signedIn: boolean
    user: AuthUser
}

export const UserContext = createContext<UserContextType>({
    signedIn: false,
    user: {} as AuthUser
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({} as AuthUser)

    useEffect(() => {
        const getAuthenticatedUser = async () => {
            try {
                let res = await fetch(`${API_URL}/api/users/me`, { method: "GET", credentials: "include"})
                if (res.ok) {
                    let user = await res.json()
                    setUser(user)
                    setSignedIn(true)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getAuthenticatedUser()
    }, [])

    return (
        <UserContext.Provider value={{ signedIn, user }}>
            {
                loading ? <Loading /> : children
            }
        </UserContext.Provider>
    )
    
}