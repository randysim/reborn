package com.reborn.backend.dto.inbound;

import java.util.List;
import jakarta.validation.constraints.NotNull;

public class BalanceSheetDeleteRequest {
    @NotNull
    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }
}
