'use client'

import { useState, useEffect } from 'react'
import { API_URL } from '@/app/lib/constants'
import { Check, Edit2, Trash2, Plus } from 'lucide-react'

export default function Goals() {
    const [goals, setGoals] = useState<Goal[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [formData, setFormData] = useState<GoalRequest>({
        title: '',
        description: '',
        difficulty: 'NORMAL'
    })

    const fetchGoals = async () => {
        try {
            const res = await fetch(`${API_URL}/api/goals`, {
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setGoals(data)
            }
        } catch (error) {
            console.error('Error fetching goals:', error)
        }
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    const handleCreateGoal = async () => {
        try {
            const res = await fetch(`${API_URL}/api/goals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                await fetchGoals()
                setFormData({
                    title: '',
                    description: '',
                    difficulty: 'NORMAL'
                })
                setDialogOpen(false)
            }
        } catch (error) {
            console.error('Error creating goal:', error)
        }
    }

    const handleEdit = (goal: Goal) => {
        setIsEditing(true)
        setSelectedGoal(goal)
        setFormData({
            title: goal.title,
            description: goal.description,
            difficulty: goal.difficulty
        })
        setDialogOpen(true)
    }

    const handleSaveEdit = async () => {
        if (!selectedGoal) return

        try {
            const res = await fetch(`${API_URL}/api/goals/${selectedGoal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                await fetchGoals()
                setIsEditing(false)
                setSelectedGoal(null)
                setFormData({
                    title: '',
                    description: '',
                    difficulty: 'NORMAL'
                })
                setDialogOpen(false)
            }
        } catch (error) {
            console.error('Error updating goal:', error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this goal?')) return
        
        try {
            const res = await fetch(`${API_URL}/api/goals/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (res.ok) {
                await fetchGoals()
            }
        } catch (error) {
            console.error('Error deleting goal:', error)
        }
    }

    const handleToggleComplete = async (goal: Goal) => {
        try {
            const endpoint = goal.completed ? 'uncomplete' : 'complete'
            const res = await fetch(`${API_URL}/api/goals/${goal.id}/${endpoint}`, {
                method: 'POST',
                credentials: 'include'
            })
            if (res.ok) {
                await fetchGoals()
            }
        } catch (error) {
            console.error('Error toggling goal completion:', error)
        }
    }

    const difficultyColors = {
        'EASY': 'bg-green-500',
        'NORMAL': 'bg-blue-500',
        'HARD': 'bg-yellow-500',
        'INSANE': 'bg-red-500'
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Goals</h1>
                <button
                    onClick={() => {
                        setIsEditing(false)
                        setSelectedGoal(null)
                        setFormData({
                            title: '',
                            description: '',
                            difficulty: 'NORMAL'
                        })
                        setDialogOpen(true)
                    }}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    <Plus size={20} />
                    New Goal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goals.map(goal => (
                    <div
                        key={goal.id}
                        className={`p-4 rounded-lg border ${
                            goal.completed ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-gray-800'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggleComplete(goal)}
                                    className={`p-1 rounded ${
                                        goal.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                >
                                    <Check size={16} className="text-white" />
                                </button>
                                <button
                                    onClick={() => handleEdit(goal)}
                                    className="p-1 rounded bg-blue-500 hover:bg-blue-600"
                                >
                                    <Edit2 size={16} className="text-white" />
                                </button>
                                <button
                                    onClick={() => handleDelete(goal.id)}
                                    className="p-1 rounded bg-red-500 hover:bg-red-600"
                                >
                                    <Trash2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-2">{goal.description}</p>
                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded text-sm text-white ${difficultyColors[goal.difficulty]}`}>
                                {goal.difficulty}
                            </span>
                            <span className="text-sm text-gray-400">
                                {new Date(goal.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {dialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {isEditing ? 'Edit Goal' : 'New Goal'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={e => setFormData(prev => ({ ...prev, difficulty: e.target.value as GoalDifficulty }))}
                                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="NORMAL">Normal</option>
                                    <option value="HARD">Hard</option>
                                    <option value="INSANE">Insane</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setIsEditing(false)
                                        setSelectedGoal(null)
                                        setFormData({
                                            title: '',
                                            description: '',
                                            difficulty: 'NORMAL'
                                        })
                                        setDialogOpen(false)
                                    }}
                                    className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={isEditing ? handleSaveEdit : handleCreateGoal}
                                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    {isEditing ? 'Save' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 