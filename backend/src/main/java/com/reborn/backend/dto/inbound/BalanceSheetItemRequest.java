package com.reborn.backend.dto.inbound;

import com.reborn.backend.model.BalanceSheetItem.ItemType;

import jakarta.validation.constraints.NotNull;

public class BalanceSheetItemRequest {
    private Long id;
    
    @NotNull(message = "Type is required")
    private ItemType type;
    
    @NotNull(message = "Amount is required")
    private Long amount;

    public ItemType getType() {
        return type;
    }

    public Long getAmount() {
        return amount;
    }

    public Long getId() {
        return id;
    }
}
