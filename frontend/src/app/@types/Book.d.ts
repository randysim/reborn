interface BookReadRequest {
    read: Boolean
}

interface BookRequest {
    id: Number
    title: String
}

interface Book {
    id: Number
    title: String
    read: Boolean
    dateRead: String
    createdAt: String
}
