'use client'
import { useContext } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"
import TaskList from "./components/TaskList"
import ProfileCard from "./components/ProfileCard"

export default function Dashboard() {
    const { signedIn, user } = useContext(UserContext)

    if (!signedIn) redirect("/");
    if (!user.onboarded) redirect("/onboard");

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex">
                {/* REST */}
                <div className="w-[75%] h-full">
                    <div className="w-full h-[400px] flex">
                        <div className="w-[35%] h-full p-10">
                            <ProfileCard />
                        </div>
                        <div className="w-[65%] h-full p-10 flex flex-col">
                            <div className="w-full h-[75%]">
                                DEATH
                            </div>
                            <div className="w-full h-[25%]">
                                Time Left
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[300px]">
                        Fitness Routine
                    </div>
                </div>
                {/* TASK LIST CONTAINER */}
                <div className="w-[25%] h-full">
                    <TaskList />
                </div>
            </div>
        </div>
    )
}