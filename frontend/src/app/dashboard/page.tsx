'use client'
import { useContext } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"
import TaskList from "./components/TaskList"

export default function Dashboard() {
    const { signedIn, user } = useContext(UserContext)

    if (!signedIn) redirect("/");
    if (!user.onboarded) redirect("/onboard");

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex">
                {/* REST */}
                <div className="w-[75%] h-full">
                    <h1>REST</h1>
                </div>
                {/* TASK LIST CONTAINER */}
                <div className="w-[25%] h-full">
                    <TaskList />
                </div>
            </div>
        </div>
    )
}