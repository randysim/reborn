import { useContext } from "react"
import { UserContext } from "@/app/components/Auth"
import { Tooltip } from "./ToolTip"
import { differenceInYears } from "date-fns"

const EXPECTED_LIFESPAN = 78

const MILESTONES = [
    { age: 18, description: "Mark Zuckerberg created Facebook" },
    { age: 21, description: "Steve Jobs co-founded Apple" },
    { age: 20, description: "Bill Gates dropped out of Harvard to start Microsoft" },
    { age: 25, description: "Average age to complete education" },
    { age: 27, description: "Elon musk becomes a millionaire by selling Zip2 for $300 million" },
    { age: 30, description: "Average age to get married" },
    { age: 31, description: "Average age to have first child" },
    { age: 33, description: "Average age to buy first home" },
    { age: 35, description: "J.K. Rowling published first Harry Potter book" },
    { age: 40, description: "Mid-life crisis age" },
    { age: 41, description: "Elon Musk becomes a billionaire" },
    { age: 42, description: "George Lucas completed first Star Wars film" },
    { age: 45, description: "Francis Ford Coppola directed The Godfather" },
    { age: 50, description: "Average age to become a grandparent" },
    { age: 65, description: "Traditional retirement age" },
    { age: 70, description: "Donald Trump became US President" },
    { age: 78, description: "Joe Biden became US President" }
]

export default function DeathTracker() {
    const { user } = useContext(UserContext)
    
    if (!user?.birthDate) {
        return <div className="text-white/80">Please set your birth date to view the death tracker</div>
    }

    const birthDate = new Date(user.birthDate)
    const currentAge = differenceInYears(new Date(), birthDate)
    const yearsLeft = EXPECTED_LIFESPAN - currentAge

    return (
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white rounded-lg h-full">
            <h1 className="text-2xl font-bold mb-4 text-white">Life</h1>
            <div className="mb-4 text-white/80">
                <p>Current Age: {currentAge} years</p>
                <p>Expected Years Remaining: {yearsLeft} years</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: EXPECTED_LIFESPAN }, (_, i) => {
                    const age = i + 1
                    const isMilestone = MILESTONES.some(m => m.age === age)
                    const isLived = age <= currentAge
                    const milestone = MILESTONES.find(m => m.age === age)
                    
                    return (
                        <Tooltip
                            key={age}
                            content={milestone ? `Age ${age}: ${milestone.description}` : `Age ${age}`}
                        >
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    ${isLived ? 'bg-blue-500' : 'bg-white/10'}
                                    ${isMilestone ? 'ring-2 ring-blue-500' : ''}
                                    transition-all duration-200
                                `}
                            >
                                {isMilestone && (
                                    <span className="text-xs font-bold text-white">★</span>
                                )}
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
        </div>
    )
}