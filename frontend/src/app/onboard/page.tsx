'use client'
import { UserContext } from "../components/Auth"
import { useContext } from "react"
import { redirect } from "next/navigation"

export default function Onboard() {
    const { user, signedIn } = useContext(UserContext)

    if (!signedIn) redirect("/");
    if (user.onboarded) redirect("/dashboard");
    
    return (
        <div>
            <h1>Onboard</h1>
        </div>
    )
}