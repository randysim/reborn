interface Connection {
    id: number
    user1: User
    user2: User
    active: boolean
}

interface ConnectionRequest {
    recipientId: number
}