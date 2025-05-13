import { UserContext } from "@/app/components/Auth";
import { useContext, useState, useEffect } from "react";
import { API_URL } from "@/app/lib/constants";
import WorkoutDialog from "./WorkoutDialog";
import WorkoutDescriptionDialog from "./WorkoutDescriptionDialog";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface FitnessRoutine {
    id: number;
    title: string;
    description: string;
}

export default function FitnessTracker() {
    const { user, refreshUser } = useContext(UserContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState<FitnessRoutine | null>(null);
    const [routines, setRoutines] = useState<FitnessRoutine[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoutines = async () => {
        try {
            const res = await fetch(`${API_URL}/api/fitness`, {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setRoutines(data);
                // Clean up invalid workout IDs
                await cleanupInvalidWorkouts(data);
            }
        } catch (error) {
            console.error('Error fetching routines:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const cleanupInvalidWorkouts = async (validRoutines: FitnessRoutine[]) => {
        if (!user.fitnessSchedule) return;

        const validIds = new Set(validRoutines.map(r => r.id));
        const hasInvalidWorkouts = user.fitnessSchedule.some(id => id !== null && !validIds.has(id));

        if (hasInvalidWorkouts) {
            const updatedSchedule = user.fitnessSchedule.map(id => 
                id !== null && !validIds.has(id) ? null : id
            );

            try {
                const res = await fetch(`${API_URL}/api/fitness/set`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        schedule: updatedSchedule
                    })
                });

                if (res.ok) {
                    await refreshUser();
                }
            } catch (error) {
                console.error('Error cleaning up invalid workouts:', error);
            }
        }
    };

    useEffect(() => {
        fetchRoutines();
        // Listen for workout updates
        const handleWorkoutUpdate = () => {
            fetchRoutines();
        };
        window.addEventListener('workoutUpdated', handleWorkoutUpdate);
        return () => {
            window.removeEventListener('workoutUpdated', handleWorkoutUpdate);
        };
    }, []);

    const getWorkoutTitle = (id: number) => {
        const routine = routines.find(r => r.id === id);
        return routine ? routine.title : null;
    };

    const handleToggleComplete = async (dayIndex: number) => {
        if (isUpdating) return;
        setIsUpdating(true);

        try {
            const res = await fetch(`${API_URL}/api/fitness/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    day: dayIndex,
                    completed: !user.fitnessScheduleCompleted[dayIndex]
                })
            });

            if (res.ok) {
                await refreshUser();
            }
        } catch (error) {
            console.error('Error updating fitness completion:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSetWorkout = async (routineId: number | null) => {
        if (selectedDay === null) return;
        setIsUpdating(true);

        try {
            const res = await fetch(`${API_URL}/api/fitness/set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    day: selectedDay,
                    id: routineId
                })
            });

            if (res.ok) {
                await refreshUser();
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error('Error setting workout:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCardClick = (index: number) => {
        if (user.fitnessSchedule?.[index]) {
            const routine = routines.find(r => r.id === user.fitnessSchedule[index]);
            if (routine) {
                setSelectedRoutine(routine);
                setIsDescriptionDialogOpen(true);
            }
        }
    };

    return (
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white rounded-lg h-full">
            <h1 className="text-2xl font-bold mb-4 text-white">Fitness Schedule</h1>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {DAYS.map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                        <h3 className="text-sm font-semibold mb-2 text-white/80">{day}</h3>
                        <div className="w-full h-[100px] md:h-auto md:aspect-square bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center">
                            {user.fitnessSchedule?.[index] && getWorkoutTitle(user.fitnessSchedule[index]) ? (
                                <div className="flex flex-col h-full justify-between w-full">
                                    <div 
                                        className="flex-grow flex flex-col items-center justify-center cursor-pointer"
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleComplete(index);
                                                }}
                                                disabled={isUpdating}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    user.fitnessScheduleCompleted?.[index]
                                                        ? 'bg-green-500 border-green-500'
                                                        : 'border-gray-400 hover:border-gray-300'
                                                }`}
                                            >
                                                {user.fitnessScheduleCompleted?.[index] && (
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                            <span className="text-sm text-white/60">{getWorkoutTitle(user.fitnessSchedule[index])}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedDay(index);
                                            setIsDialogOpen(true);
                                        }}
                                        className="cursor-pointer w-full p-2 border border-white/20 rounded-lg text-sm text-white/60 hover:text-white/80 hover:border-white/40 transition-colors"
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full justify-between w-full">
                                    <div className="flex-grow flex items-center justify-center">
                                        <span className="text-sm text-white/40">No Workout</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedDay(index);
                                            setIsDialogOpen(true);
                                        }}
                                        className="cursor-pointer w-full p-2 border border-white/20 rounded-lg text-sm text-white/60 hover:text-white/80 hover:border-white/40 transition-colors"
                                    >
                                        Set
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <WorkoutDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSelect={handleSetWorkout}
                currentRoutineId={selectedDay !== null ? user.fitnessSchedule?.[selectedDay] || null : null}
            />
            <WorkoutDescriptionDialog
                isOpen={isDescriptionDialogOpen}
                onClose={() => setIsDescriptionDialogOpen(false)}
                routine={selectedRoutine}
            />
        </div>
    );
}