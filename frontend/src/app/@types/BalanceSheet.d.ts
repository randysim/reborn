type ItemType = "ASSET" | "LIABILITY"

interface BalanceSheetItemRequest {
    id?: number
    type: ItemType
    amount: number
}

interface BalanceSheetDeleteRequest {
    ids: number[]
}

interface BalanceSheetItemBulkRequest {
    items: BalanceSheetItemRequest[]
}

interface BalanceSheetItemsResponse {
    items: BalanceSheetItem[]
}

interface BalanceSheetItem {
    id?: number
    type: ItemType
    amount: number
    createdAt: string
    updatedAt: string
}