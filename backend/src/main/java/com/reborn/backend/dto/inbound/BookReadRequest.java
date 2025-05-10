package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class BookReadRequest {
    @NotNull
    private boolean read;

    public boolean isRead() {
        return read;
    }
}
