import { useState, useEffect } from 'react';
import { API_URL } from '@/app/lib/constants';
import WorkoutFormDialog from './WorkoutFormDialog';

interface FitnessRoutine {
    id: number;
    title: string;
    description: string;
}

interface WorkoutDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (routineId: number | null) => void;
    currentRoutineId: number | null;
}

export default function WorkoutDialog({ isOpen, onClose, onSelect, currentRoutineId }: WorkoutDialogProps) {
    const [routines, setRoutines] = useState<FitnessRoutine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState<FitnessRoutine | undefined>();
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchRoutines = async () => {
        try {
            const res = await fetch(`${API_URL}/api/fitness`, {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setRoutines(data);
            }
        } catch (error) {
            console.error('Error fetching routines:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (routineId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            const res = await fetch(`${API_URL}/api/fitness/${routineId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.ok) {
                await fetchRoutines();
                // If the deleted workout was the currently selected one, set it to null
                if (routineId === currentRoutineId) {
                    onSelect(null);
                }
                // Also refresh the parent component's routines
                const event = new CustomEvent('workoutUpdated');
                window.dispatchEvent(event);
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchRoutines();
        }
    }, [isOpen]);

    const handleCreateClick = () => {
        setSelectedRoutine(undefined);
        setIsFormOpen(true);
    };

    const handleUpdateClick = (routine: FitnessRoutine) => {
        setSelectedRoutine(routine);
        setIsFormOpen(true);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black/70 backdrop-blur-sm border border-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Select Workout</h2>
                        <button
                            onClick={handleCreateClick}
                            className="cursor-pointer px-3 py-1 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                        >
                            Create Workout
                        </button>
                    </div>
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                        <button
                            onClick={() => onSelect(null)}
                            className="cursor-pointer w-full p-3 rounded-lg text-left transition-colors bg-white/10 hover:bg-white/20 flex items-center gap-3"
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                currentRoutineId === null
                                    ? 'bg-white border-white'
                                    : 'border-white/40 hover:border-white/60'
                            }`}>
                                {currentRoutineId === null && (
                                    <div className="w-3 h-3 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-white/80">No Workout</span>
                        </button>
                        {isLoading ? (
                            <div className="text-white/60 text-center py-4">Loading routines...</div>
                        ) : (
                            routines.map((routine) => (
                                <div key={routine.id} className="group relative">
                                    <button
                                        onClick={() => onSelect(routine.id)}
                                        className="cursor-pointer w-full p-3 rounded-lg text-left transition-colors bg-white/10 hover:bg-white/20 flex items-center gap-3"
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                            currentRoutineId === routine.id
                                                ? 'bg-white border-white'
                                                : 'border-white/40 hover:border-white/60'
                                        }`}>
                                            {currentRoutineId === routine.id && (
                                                <div className="w-3 h-3 rounded-full bg-gray-900" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white/80 font-medium">{routine.title}</div>
                                        </div>
                                    </button>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button
                                            onClick={() => handleUpdateClick(routine)}
                                            className="cursor-pointer px-2 py-1 text-sm bg-white/10 text-white/80 rounded hover:bg-white/20 border border-white/20"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(routine.id, e)}
                                            disabled={isDeleting}
                                            className="cursor-pointer px-2 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 border border-red-500/20"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer mt-4 w-full p-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                    >
                        Close
                    </button>
                </div>
            </div>
            <WorkoutFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={() => {
                    fetchRoutines();
                    // Also refresh the parent component's routines
                    const event = new CustomEvent('workoutUpdated');
                    window.dispatchEvent(event);
                }}
                routine={selectedRoutine}
            />
        </>
    );
} 