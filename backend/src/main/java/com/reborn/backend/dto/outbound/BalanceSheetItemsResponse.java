package com.reborn.backend.dto.outbound;

import java.util.List;
import java.util.stream.Collectors;
import com.reborn.backend.model.BalanceSheetItem;

public class BalanceSheetItemsResponse {
    private List<BalanceSheetItemResponse> items;
    
    public BalanceSheetItemsResponse(List<BalanceSheetItem> items) {
        this.items = items.stream()
            .map(BalanceSheetItemResponse::new)
            .collect(Collectors.toList());
    }

    public List<BalanceSheetItemResponse> getItems() {
        return items;
    }
}
