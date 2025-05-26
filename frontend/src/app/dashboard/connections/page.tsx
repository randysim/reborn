'use client'

import { useState, useEffect, useContext } from 'react'
import { API_URL } from '@/app/lib/constants'
import { UserPlus, UserMinus, Check, X } from 'lucide-react'
import { UserContext } from '@/app/components/Auth'

export default function Connections() {
    const { user } = useContext(UserContext)
    const [connections, setConnections] = useState<Connection[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [recipientId, setRecipientId] = useState('')
    const [isAccepting, setIsAccepting] = useState<number | null>(null)

    const fetchConnections = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/connections`, {
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setConnections(data)
            }
        } catch (error) {
            console.error('Error fetching connections:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    const handleCreateConnection = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/api/connections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ recipientId: parseInt(recipientId) })
            })
            if (res.ok) {
                await fetchConnections()
                setRecipientId('')
            }
        } catch (error) {
            console.error('Error creating connection:', error)
        }
    }

    const handleAcceptConnection = async (id: number) => {
        if (isAccepting === id) return
        setIsAccepting(id)
        try {
            const res = await fetch(`${API_URL}/api/connections/${id}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                if (data.success) {
                    await fetchConnections()
                }
            }
        } catch (error) {
            console.error('Error accepting connection:', error)
        } finally {
            setIsAccepting(null)
        }
    }

    const handleRejectConnection = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/connections/${id}/reject`, {
                method: 'POST',
                credentials: 'include'
            })
            if (res.ok) {
                await fetchConnections()
            }
        } catch (error) {
            console.error('Error rejecting connection:', error)
        }
    }

    const handleDeleteConnection = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/connections/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (res.ok) {
                await fetchConnections()
            }
        } catch (error) {
            console.error('Error deleting connection:', error)
        }
    }

    const pendingConnections = connections.filter(conn => !conn.active)
    const acceptedConnections = connections.filter(conn => conn.active)

    const getOtherUser = (connection: Connection) => {
        return connection.user1.id === user.id ? connection.user2 : connection.user1
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Connections</h1>
                <div className="text-sm text-gray-500">
                    Your ID: {user.id}
                </div>
            </div>

            {/* Create Connection Form */}
            <form onSubmit={handleCreateConnection} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        placeholder="Enter user ID to connect with"
                        className="px-4 py-2 border rounded-lg flex-grow bg-white/5 text-white placeholder-gray-400"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                    >
                        <UserPlus size={20} />
                        Connect
                    </button>
                </div>
            </form>

            {/* Pending Connections */}
            {pendingConnections.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Pending Connections</h2>
                    <div className="grid gap-4">
                        {pendingConnections.map((connection) => {
                            const isInitiator = connection.user1.id === user.id
                            const otherUser = isInitiator ? connection.user2 : connection.user1
                            return (
                                <div
                                    key={connection.id}
                                    className="border border-white/20 rounded-lg p-4 flex items-center justify-between bg-white/5 backdrop-blur-sm"
                                >
                                    <div>
                                        <p className="font-medium text-white">{otherUser.username}</p>
                                        <p className="text-sm text-gray-400">
                                            {isInitiator ? 'You sent this request' : 'They sent you a request'}
                                        </p>
                                    </div>
                                    {!isInitiator && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAcceptConnection(connection.id)}
                                                className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors disabled:opacity-50"
                                                title="Accept"
                                                disabled={isAccepting === connection.id}
                                            >
                                                <Check size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleRejectConnection(connection.id)}
                                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                title="Reject"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Accepted Connections */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Accepted Connections</h2>
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : acceptedConnections.length === 0 ? (
                    <div className="text-center text-gray-500">No accepted connections found</div>
                ) : (
                    <div className="grid gap-4">
                        {acceptedConnections.map((connection) => {
                            const otherUser = getOtherUser(connection)
                            return (
                                <div
                                    key={connection.id}
                                    className="border border-white/20 rounded-lg p-4 flex items-center justify-between bg-white/5 backdrop-blur-sm"
                                >
                                    <div>
                                        <p className="font-medium text-white">{otherUser.username}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDeleteConnection(connection.id)}
                                            className="p-2 text-gray-400 hover:bg-gray-400/10 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <UserMinus size={20} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}