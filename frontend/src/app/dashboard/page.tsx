'use client'
import { useContext } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"

export default function Dashboard() {
    const { signedIn, user } = useContext(UserContext)

    if (!signedIn) redirect("/");
    if (!user.onboarded) redirect("/onboard");

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}