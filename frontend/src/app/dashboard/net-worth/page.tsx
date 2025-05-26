'use client'

import { useState, useEffect } from 'react'
import { API_URL } from '@/app/lib/constants'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface BalanceSheetItem {
    id?: number
    type: "ASSET" | "LIABILITY"
    amount: number
    createdAt: string
    updatedAt: string
}

interface BalanceSheetItemRequest {
    id?: number
    type: "ASSET" | "LIABILITY"
    amount: number
}

export default function NetWorth() {
    const [items, setItems] = useState<BalanceSheetItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedItem, setSelectedItem] = useState<BalanceSheetItem | null>(null)
    const [editAmount, setEditAmount] = useState('')
    const [editType, setEditType] = useState<"ASSET" | "LIABILITY">("ASSET")

    const fetchItems = async () => {
        try {
            const res = await fetch(`${API_URL}/api/balance`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setItems(data.items)
            }
        } catch (error) {
            console.error('Error fetching balance sheet items:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleCreateItem = async () => {
        try {
            const newItem: BalanceSheetItemRequest = {
                type: editType,
                amount: parseFloat(editAmount)
            }

            const res = await fetch(`${API_URL}/api/balance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ items: [newItem] })
            })

            if (res.ok) {
                await fetchItems()
                setEditAmount('')
                setEditType("ASSET")
            }
        } catch (error) {
            console.error('Error creating balance sheet item:', error)
        }
    }

    const handleEdit = (item: BalanceSheetItem) => {
        setIsEditing(true)
        setSelectedItem(item)
        setEditAmount(item.amount.toString())
        setEditType(item.type)
    }

    const handleSaveEdit = async () => {
        if (!selectedItem) return

        try {
            const updatedItem: BalanceSheetItemRequest = {
                id: selectedItem.id,
                type: editType,
                amount: parseFloat(editAmount)
            }

            const res = await fetch(`${API_URL}/api/balance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ items: [updatedItem] })
            })

            if (res.ok) {
                await fetchItems()
                setIsEditing(false)
                setSelectedItem(null)
                setEditAmount('')
                setEditType("ASSET")
            }
        } catch (error) {
            console.error('Error updating balance sheet item:', error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/balance`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ids: [id] })
            })

            if (res.ok) {
                await fetchItems()
            }
        } catch (error) {
            console.error('Error deleting balance sheet item:', error)
        }
    }

    const totalAssets = items
        .filter(item => item.type === "ASSET")
        .reduce((sum, item) => sum + item.amount, 0)

    const totalLiabilities = items
        .filter(item => item.type === "LIABILITY")
        .reduce((sum, item) => sum + item.amount, 0)

    const netWorth = totalAssets - totalLiabilities

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Net Worth</h1>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Total Assets</p>
                        <p className="text-xl font-bold text-green-500">${totalAssets.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Total Liabilities</p>
                        <p className="text-xl font-bold text-red-500">${totalLiabilities.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Net Worth</p>
                        <p className={`text-xl font-bold ${netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${netWorth.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <div className="flex gap-4">
                    <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value as "ASSET" | "LIABILITY")}
                        className="p-2 bg-white/10 border border-white/20 rounded text-white"
                    >
                        <option value="ASSET">Asset</option>
                        <option value="LIABILITY">Liability</option>
                    </select>
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        placeholder="Amount"
                        className="p-2 bg-white/10 border border-white/20 rounded text-white flex-grow"
                    />
                    <button
                        onClick={handleCreateItem}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Assets</h2>
                        <div className="space-y-4">
                            {items
                                .filter(item => item.type === "ASSET")
                                .map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-white/5 border border-white/20 rounded-lg p-4 flex items-center justify-between"
                                    >
                                        {isEditing && selectedItem?.id === item.id ? (
                                            <div className="flex gap-4 w-full">
                                                <select
                                                    value={editType}
                                                    onChange={(e) => setEditType(e.target.value as "ASSET" | "LIABILITY")}
                                                    className="p-2 bg-white/10 border border-white/20 rounded text-white"
                                                >
                                                    <option value="ASSET">Asset</option>
                                                    <option value="LIABILITY">Liability</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    value={editAmount}
                                                    onChange={(e) => setEditAmount(e.target.value)}
                                                    className="p-2 bg-white/10 border border-white/20 rounded text-white flex-grow"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(false)
                                                            setSelectedItem(null)
                                                            setEditAmount('')
                                                            setEditType("ASSET")
                                                        }}
                                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="text-lg font-semibold">${item.amount.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-400">
                                                        Last updated: {new Date(item.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => item.id && handleDelete(item.id)}
                                                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Liabilities</h2>
                        <div className="space-y-4">
                            {items
                                .filter(item => item.type === "LIABILITY")
                                .map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-white/5 border border-white/20 rounded-lg p-4 flex items-center justify-between"
                                    >
                                        {isEditing && selectedItem?.id === item.id ? (
                                            <div className="flex gap-4 w-full">
                                                <select
                                                    value={editType}
                                                    onChange={(e) => setEditType(e.target.value as "ASSET" | "LIABILITY")}
                                                    className="p-2 bg-white/10 border border-white/20 rounded text-white"
                                                >
                                                    <option value="ASSET">Asset</option>
                                                    <option value="LIABILITY">Liability</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    value={editAmount}
                                                    onChange={(e) => setEditAmount(e.target.value)}
                                                    className="p-2 bg-white/10 border border-white/20 rounded text-white flex-grow"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(false)
                                                            setSelectedItem(null)
                                                            setEditAmount('')
                                                            setEditType("ASSET")
                                                        }}
                                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="text-lg font-semibold">${item.amount.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-400">
                                                        Last updated: {new Date(item.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => item.id && handleDelete(item.id)}
                                                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 