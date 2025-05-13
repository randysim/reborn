import { UserContext } from "@/app/components/Auth"
import { useContext } from "react"

export default function ProfileCard() {
    const { user } = useContext(UserContext)
    
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white p-4 rounded-lg h-[300px] overflow-y-auto">
            <div className="flex flex-col gap-3">
                {/* Personal Information Section */}
                <div>
                    <h1 className="text-xl font-bold mb-2">Profile Information</h1>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-gray-300">Username</p>
                            <p className="font-semibold">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-gray-300">Email</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-300">Birth Date</p>
                            <p className="font-semibold">{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Not set'}</p>
                        </div>
                        <div>
                            <p className="text-gray-300">Timezone</p>
                            <p className="font-semibold">{user.timezone}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div>
                    <h2 className="text-lg font-bold mb-2">Stats</h2>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Strength:</span>
                            <span className="font-semibold">{user.strength}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Wealth:</span>
                            <span className="font-semibold">{user.wealth}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Intelligence:</span>
                            <span className="font-semibold">{user.intelligence}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Aura:</span>
                            <span className="font-semibold">{user.aura}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Coins:</span>
                            <span className="font-semibold">{user.coins}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Cheat Days:</span>
                            <span className="font-semibold">{user.cheatDays}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}