package com.reborn.backend.dto.outbound;

import java.util.List;

import com.reborn.backend.model.BalanceSheetItem;

public class BalanceSheetItemsResponse {
    private List<BalanceSheetItem> balanceSheetItems;
    
    public BalanceSheetItemsResponse(List<BalanceSheetItem> balanceSheetItems) {
        this.balanceSheetItems = balanceSheetItems;
    }

    public List<BalanceSheetItem> getBalanceSheetItems() {
        return balanceSheetItems;
    }
}
