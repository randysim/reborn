package com.reborn.backend.dto.inbound;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class BalanceSheetItemBulkRequest {
    @NotEmpty(message = "At least one item is required")
    @Valid
    private List<BalanceSheetItemRequest> items;

    public BalanceSheetItemBulkRequest() {}

    public BalanceSheetItemBulkRequest(List<BalanceSheetItemRequest> items) {
        this.items = items;
    }

    public List<BalanceSheetItemRequest> getItems() {
        return items;
    }

    public void setItems(List<BalanceSheetItemRequest> items) {
        this.items = items;
    }
} 