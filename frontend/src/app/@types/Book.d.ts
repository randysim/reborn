interface BookReadRequest {
    read: boolean
}

interface BookRequest {
    id: number
    title: string
}

interface Book {
    id: number
    title: string
    read: boolean
    dateRead: string
    createdAt: string
}
