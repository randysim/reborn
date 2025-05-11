type ItemType = "ASSET" | "LIABILITY"

interface BalanceSheetItemRequest {
    id?: Number
    type: ItemType
    amount: Number
}

interface BalanceSheetDeleteRequest {
    ids: Number[]
}

interface BalanceSheetItemBulkRequest {
    items: BalanceSheetItemRequest[]
}

interface BalanceSheetItemsResponse {
    items: BalanceSheetItem[]
}

interface BalanceSheetItem {
    id?: Number
    type: ItemType
    amount: Number
    createdAt: String
    updatedAt: String
}