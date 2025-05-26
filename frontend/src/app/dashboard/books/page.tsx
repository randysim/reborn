'use client'

import { useState, useEffect } from 'react'
import { API_URL } from '@/app/lib/constants'
import { Check, Edit2, Trash2, Plus } from 'lucide-react'

interface Book {
    id: number
    title: string
    read: boolean
    dateRead: string
    createdAt: string
}

interface BookRequest {
    id: number
    title: string
}

export default function Books() {
    const [books, setBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const [editTitle, setEditTitle] = useState('')

    const fetchBooks = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/books`, {
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setBooks(data)
            }
        } catch (error) {
            console.error('Error fetching books:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const handleToggleRead = async (book: Book) => {
        try {
            const res = await fetch(`${API_URL}/api/books/${book.id}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ read: !book.read })
            })
            if (res.ok) {
                await fetchBooks()
            }
        } catch (error) {
            console.error('Error updating book read status:', error)
        }
    }

    const handleDelete = async (bookId: number) => {
        if (!confirm('Are you sure you want to delete this book?')) return
        
        try {
            const res = await fetch(`${API_URL}/api/books/${bookId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (res.ok) {
                await fetchBooks()
            }
        } catch (error) {
            console.error('Error deleting book:', error)
        }
    }

    const handleEdit = (book: Book) => {
        setSelectedBook(book)
        setEditTitle(book.title)
        setIsEditing(true)
    }

    const handleSaveEdit = async () => {
        if (!selectedBook) return

        try {
            const res = await fetch(`${API_URL}/api/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: selectedBook.id,
                    title: editTitle
                })
            })
            if (res.ok) {
                await fetchBooks()
                setIsEditing(false)
                setSelectedBook(null)
                setEditTitle('')
            }
        } catch (error) {
            console.error('Error updating book:', error)
        }
    }

    const handleCreateBook = async () => {
        try {
            const res = await fetch(`${API_URL}/api/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: 0, // The backend will assign a real ID
                    title: 'New Book'
                })
            })
            if (res.ok) {
                await fetchBooks()
            }
        } catch (error) {
            console.error('Error creating book:', error)
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Books</h1>
                <button
                    onClick={handleCreateBook}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Book
                </button>
            </div>

            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className="bg-white/5 border border-white/20 rounded-lg p-6 relative group"
                        >
                            {isEditing && selectedBook?.id === book.id ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-2 bg-white/10 border border-white/20 rounded text-white"
                                        autoFocus
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
                                                setSelectedBook(null)
                                                setEditTitle('')
                                            }}
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-semibold text-white">{book.title}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.id)}
                                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleToggleRead(book)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                                book.read
                                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                    : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                                            }`}
                                        >
                                            <Check className="w-4 h-4" />
                                            {book.read ? 'Read' : 'Unread'}
                                        </button>
                                        {book.read && book.dateRead && (
                                            <p className="mt-2 text-sm text-white/60">
                                                Read on: {new Date(book.dateRead).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 