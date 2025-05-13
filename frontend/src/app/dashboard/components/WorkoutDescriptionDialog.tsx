interface FitnessRoutine {
    id: number;
    title: string;
    description: string;
}

interface WorkoutDescriptionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    routine: FitnessRoutine | null;
}

export default function WorkoutDescriptionDialog({ isOpen, onClose, routine }: WorkoutDescriptionDialogProps) {
    if (!isOpen || !routine) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black/70 backdrop-blur-sm border border-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">{routine.title}</h2>
                <p className="text-white/80 whitespace-pre-wrap">{routine.description}</p>
                <button
                    onClick={onClose}
                    className="cursor-pointer mt-6 w-full p-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                    Close
                </button>
            </div>
        </div>
    );
} 