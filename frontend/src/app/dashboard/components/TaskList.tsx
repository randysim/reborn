import { useState, useEffect } from "react"
import { API_URL } from "@/app/lib/constants"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

interface TaskDialogProps {
    task?: Task
    open: boolean
    onClose: () => void
    onSubmit: (taskData: TaskRequest) => Promise<void>
}

function TaskDialog({ task, open, onClose, onSubmit }: TaskDialogProps) {
    const [formData, setFormData] = useState<TaskRequest>({
        description: task?.description || "",
        recurring: task?.recurring || 0,
        dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
        difficulty: task?.difficulty || "NORMAL",
        priority: task?.priority || "MEDIUM"
    });
    const [isRecurring, setIsRecurring] = useState(task?.recurring ? task.recurring > 0 : false);

    useEffect(() => {
        if (open) {
            setFormData({
                description: task?.description || "",
                recurring: task?.recurring || 0,
                dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
                difficulty: task?.difficulty || "NORMAL",
                priority: task?.priority || "MEDIUM"
            });
            setIsRecurring(task?.recurring ? task.recurring > 0 : false);
        }
    }, [open, task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            ...formData,
            recurring: isRecurring ? formData.recurring : 0
        });
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-900 p-6 rounded-lg w-[500px] border border-gray-700 shadow-xl">
                <h1 className="text-2xl font-bold mb-4">{task ? "Edit Task" : "Create Task"}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Description</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-2 border rounded bg-gray-800 border-gray-700"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="recurring"
                            checked={isRecurring}
                            onChange={(e) => {
                                setIsRecurring(e.target.checked);
                                if (!e.target.checked) {
                                    setFormData({...formData, recurring: 0});
                                }
                            }}
                            className="w-4 h-4"
                        />
                        <label htmlFor="recurring">Recurring Task</label>
                    </div>
                    {isRecurring && (
                        <div>
                            <label className="block mb-1">Repeat every (days)</label>
                            <input
                                type="number"
                                value={formData.recurring || 1}
                                onChange={(e) => setFormData({...formData, recurring: parseInt(e.target.value) || 1})}
                                className="w-full p-2 border rounded bg-gray-800 border-gray-700"
                                min="1"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1">Due Date and Time</label>
                        <input
                            type="datetime-local"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            className="w-full p-2 border rounded bg-gray-800 border-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Difficulty</label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({...formData, difficulty: e.target.value as TaskDifficulty})}
                            className="w-full p-2 border rounded bg-gray-800 border-gray-700"
                            required
                        >
                            <option value="EASY">Easy</option>
                            <option value="NORMAL">Normal</option>
                            <option value="HARD">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({...formData, priority: e.target.value as TaskPriority})}
                            className="w-full p-2 border rounded bg-gray-800 border-gray-700"
                            required
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 border border-gray-700 rounded hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {task ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

interface TaskCardProps {
    task: Task
    onToggleComplete: (taskId: number, completed: boolean) => Promise<void>
    onEdit: (task: Task) => void
    onDelete: (taskId: number) => Promise<void>
    isCompleted?: boolean
}

function TaskCard({ task, onToggleComplete, onEdit, onDelete, isCompleted = false }: TaskCardProps) {
    return (
        <div className={`bg-gray-800 p-4 rounded-lg relative ${isCompleted ? 'opacity-50' : ''}`}>
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={() => onEdit(task)}
                    className="text-gray-400 hover:text-gray-300"
                >
                    <PencilIcon className="w-5 h-5 cursor-pointer" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    <TrashIcon className="w-5 h-5 cursor-pointer" />
                </button>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                    className={`cursor-pointer w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-400 hover:border-gray-300'
                    }`}
                >
                    {task.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <div>
                    <h2 className={`text-lg ${isCompleted ? 'line-through' : ''}`}>{task.description}</h2>
                    <div className="flex gap-2 text-sm text-gray-400">
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}</span>
                        <span>•</span>
                        <span>{task.difficulty.charAt(0) + task.difficulty.slice(1).toLowerCase()}</span>
                        {task.recurring > 0 && (
                            <>
                                <span>•</span>
                                <span>Every {task.recurring} days</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    const fetchTasks = async () => {
        const res = await fetch(`${API_URL}/api/tasks`, { method: "GET", credentials: "include" });
        
        if (res.ok) {
            let tasks = await res.json();
            setTasks(tasks);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (taskData: TaskRequest) => {
        const res = await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });

        if (res.ok) {
            await fetchTasks();
        }
    };

    const handleUpdateTask = async (taskData: TaskRequest) => {
        if (!selectedTask) return;
        
        const res = await fetch(`${API_URL}/api/tasks/${selectedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });

        if (res.ok) {
            await fetchTasks();
        }
    };

    const handleToggleComplete = async (taskId: number, completed: boolean) => {
        const endpoint = completed ? 'complete' : 'uncomplete';
        const res = await fetch(`${API_URL}/api/tasks/${endpoint}/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        if (res.ok) {
            await fetchTasks();
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: "include",
        });

        if (res.ok) {
            await fetchTasks();
        }
    };

    const openCreateDialog = () => {
        setSelectedTask(undefined);
        setDialogOpen(true);
    };

    const openEditDialog = (task: Task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleDialogSubmit = async (taskData: TaskRequest) => {
        if (selectedTask) {
            await handleUpdateTask(taskData);
        } else {
            await handleCreateTask(taskData);
        }
    };

    const completedTasks = tasks
        .filter((task) => task.completed)
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    const toDoTasks = tasks
        .filter((task) => !task.completed)
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    return (
        <div className="w-full h-full overflow-y-scroll pb-[32px]">
            <h1 className="text-4xl text-center mt-[32px] mb-[16px]">Tasks</h1>
            <div className="flex justify-center mt-[32px] mb-[16px]">
                <button 
                    onClick={openCreateDialog}
                    className="border-2 border-white p-2 px-8 cursor-pointer hover:bg-white hover:text-black font-bold"
                >
                    Create
                </button>
            </div>
            <div className="flex flex-col gap-4 px-4">
                {toDoTasks.length > 0 ? (
                    toDoTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={openEditDialog}
                            onDelete={handleDeleteTask}
                        />
                    ))
                ) : (
                    <h1 className="text-2xl text-center mt-[32px] mb-[16px] text-red-500">No tasks</h1>
                )}
            </div>
            <div className="px-8 my-[24px]">
                <div className="h-[1px] bg-gray-700"></div>
            </div>
            <div className="flex flex-col gap-4 px-4">
                {completedTasks.length > 0 ? (
                    completedTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={openEditDialog}
                            onDelete={handleDeleteTask}
                            isCompleted={true}
                        />
                    ))
                ) : (
                    <h1 className="text-2xl text-center mt-[32px] mb-[16px] text-red-500">No completed tasks</h1>
                )}
            </div>
            <TaskDialog
                task={selectedTask}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleDialogSubmit}
            />
        </div>
    )
}