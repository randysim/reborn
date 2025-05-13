'use client'
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../lib/constants"
import Loading from "./Loading";

interface UserContextType {
    signedIn: boolean
    user: AuthUser
    refreshUser: () => void
    logout: () => void
}

export const UserContext = createContext<UserContextType>({
    signedIn: false,
    user: {} as AuthUser,
    refreshUser: () => {},
    logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({} as AuthUser)

    const refreshUser = async () => {
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

    const logout = async () => {
        window.location.href = `${API_URL}/logout`
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <UserContext.Provider value={{ signedIn, user, refreshUser, logout }}>
            {
                loading ? <Loading /> : children
            }
        </UserContext.Provider>
    )
    
}