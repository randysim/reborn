'use client'
import { UserContext } from "../components/Auth"
import { useContext } from "react"
import { redirect } from "next/navigation"

export default function Onboard() {
    const { user } = useContext(UserContext)

    if (user.onboarded) return redirect("/dashboard");

    return (
        <div>
            <h1>Onboard</h1>
        </div>
    )
}