'use client'
import { useContext, useEffect } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"

export default function Dashboard() {
    const { signedIn, user } = useContext(UserContext)

    if (!signedIn) return redirect("/");
    if (!user.onboarded) return redirect("/onboard");

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}