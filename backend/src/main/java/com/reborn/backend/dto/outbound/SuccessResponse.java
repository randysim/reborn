package com.reborn.backend.dto.outbound;

public class SuccessResponse {
    private final boolean success;

    public SuccessResponse(boolean success) {
        this.success = success;
    }

    public boolean getSuccess() {
        return success;
    }
}
