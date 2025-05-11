package com.reborn.backend.dto.outbound;

import java.util.List;

import com.reborn.backend.model.BalanceSheetItem;

public class BalanceSheetItemsResponse {
    private List<BalanceSheetItem> items;
    
    public BalanceSheetItemsResponse(List<BalanceSheetItem> items) {
        this.items = items;
    }

    public List<BalanceSheetItem> getItems() {
        return items;
    }
}
