package com.reborn.backend.dto.outbound;

import java.time.LocalDateTime;

import com.reborn.backend.model.BalanceSheetItem;
import com.reborn.backend.model.BalanceSheetItem.ItemType;

public class BalanceSheetItemResponse {
    private Long id;
    private ItemType type;
    private Long amount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BalanceSheetItemResponse(BalanceSheetItem balanceSheetItem) {
        this.id = balanceSheetItem.getId();
        this.type = balanceSheetItem.getType();
        this.amount = balanceSheetItem.getAmount();
        this.createdAt = balanceSheetItem.getCreatedAt();
        this.updatedAt = balanceSheetItem.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public ItemType getType() {
        return type;
    }

    public Long getAmount() {
        return amount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
