'use client'
import { useContext } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"
import TaskList from "./components/TaskList"
import ProfileCard from "./components/ProfileCard"
import DeathTracker from "./components/DeathTracker"

export default function Dashboard() {
    const { signedIn, user } = useContext(UserContext)

    if (!signedIn) redirect("/");
    if (!user.onboarded) redirect("/onboard");

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex flex-col md:flex-row">
                {/* REST */}
                <div className="w-full md:w-[75%] h-full">
                    <div className="w-full h-auto flex flex-col md:flex-row">
                        <div className="w-full md:w-[35%] h-full p-4 md:p-10">
                            <ProfileCard />
                        </div>
                        <div className="w-full md:w-[65%] h-full p-4 md:p-10 flex flex-col">
                            <DeathTracker />
                        </div>
                    </div>
                    <div className="w-full h-[300px]">
                        Fitness Routine
                    </div>
                </div>
                {/* TASK LIST CONTAINER */}
                <div className="w-full md:w-[25%] h-full">
                    <TaskList />
                </div>
            </div>
        </div>
    )
}