import { useState, useEffect } from 'react';
import { API_URL } from '@/app/lib/constants';

interface FitnessRoutine {
    id: number;
    title: string;
    description: string;
}

interface WorkoutFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    routine?: FitnessRoutine;
}

export default function WorkoutFormDialog({ isOpen, onClose, onSuccess, routine }: WorkoutFormDialogProps) {
    const [formData, setFormData] = useState({
        title: routine?.title || '',
        description: routine?.description || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (routine) {
            setFormData({
                title: routine.title,
                description: routine.description
            });
        } else {
            setFormData({
                title: '',
                description: ''
            });
        }
    }, [routine]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = routine 
                ? `${API_URL}/api/fitness/${routine.id}`
                : `${API_URL}/api/fitness`;
            
            const res = await fetch(url, {
                method: routine ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Error saving workout:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black/70 backdrop-blur-sm border border-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">
                    {routine ? 'Update Workout' : 'Create Workout'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                            placeholder="Enter workout title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                            placeholder="Enter workout description"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 p-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
                        >
                            {isSubmitting ? 'Saving...' : (routine ? 'Update' : 'Create')}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 