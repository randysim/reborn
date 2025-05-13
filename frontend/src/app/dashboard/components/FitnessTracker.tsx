import { UserContext } from "@/app/components/Auth";
import { useContext } from "react";

export default function FitnessTracker() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Fitness Tracker</h1>
        </div>
    )
}