'use client'

import { useState, useEffect } from 'react'
import { format, addDays, subDays, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { API_URL } from '@/app/lib/constants'

export default function Journal() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [journal, setJournal] = useState<Journal | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState<JournalRequest>({
        positives: '',
        negatives: ''
    })
    const [hasChanges, setHasChanges] = useState(false)

    const fetchJournal = async (date: Date) => {
        setIsLoading(true)
        setJournal(null)
        setFormData({ positives: '', negatives: '' })
        setHasChanges(false)
        
        try {
            const dateStr = format(date, 'yyyy-MM-dd')
            const res = await fetch(`${API_URL}/api/journals?date=${dateStr}`, {
                credentials: 'include'
            })
            
            if (res.ok) {
                const data = await res.json()
                if (data && data.id) {
                    setJournal(data)
                    setFormData({
                        positives: data.positives,
                        negatives: data.negatives
                    })
                }
            } else if (res.status === 404) {
                setJournal(null)
                setFormData({ positives: '', negatives: '' })
            }
        } catch (error) {
            console.error('Error fetching journal:', error)
            setJournal(null)
            setFormData({ positives: '', negatives: '' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJournal(selectedDate)
    }, [selectedDate])

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = parseISO(e.target.value)
        setSelectedDate(newDate)
    }

    const handlePrevDay = () => {
        setSelectedDate(prev => subDays(prev, 1))
    }

    const handleNextDay = () => {
        setSelectedDate(prev => addDays(prev, 1))
    }

    const handleCreateJournal = async () => {
        setIsSaving(true)
        try {
            const dateStr = format(selectedDate, 'yyyy-MM-dd')
            const res = await fetch(`${API_URL}/api/journals?date=${dateStr}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (res.ok) {
                const newJournal = await res.json()
                setJournal(newJournal)
                setFormData({
                    positives: newJournal.positives,
                    negatives: newJournal.negatives
                })
                setHasChanges(false)
            }
        } catch (error) {
            console.error('Error creating journal:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleSaveJournal = async () => {
        if (!journal || !hasChanges) return
        setIsSaving(true)
        try {
            const res = await fetch(`${API_URL}/api/journals/${journal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                await fetchJournal(selectedDate)
            }
        } catch (error) {
            console.error('Error saving journal:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Check if the new value is different from the original journal content
        if (journal) {
            const hasChanged = name === 'positives' 
                ? value !== journal.positives 
                : value !== journal.negatives
            setHasChanges(hasChanged)
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handlePrevDay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <input
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={handleDateChange}
                    className="text-2xl font-bold text-white bg-transparent border-none focus:outline-none cursor-pointer"
                />
                <button
                    onClick={handleNextDay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>

            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : journal ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-white mb-2">Positives</label>
                        <textarea
                            name="positives"
                            value={formData.positives}
                            onChange={handleInputChange}
                            className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="What went well today?"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Negatives</label>
                        <textarea
                            name="negatives"
                            value={formData.negatives}
                            onChange={handleInputChange}
                            className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="What could have gone better?"
                        />
                    </div>
                    <button
                        onClick={handleSaveJournal}
                        disabled={isSaving || !hasChanges}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Journal'}
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-white mb-4">No journal entry for this date</p>
                    <button
                        onClick={handleCreateJournal}
                        disabled={isSaving}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Creating...' : 'Create Journal Entry'}
                    </button>
                </div>
            )}
        </div>
    )
} 