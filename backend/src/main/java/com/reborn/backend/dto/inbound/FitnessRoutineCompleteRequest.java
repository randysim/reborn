package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class FitnessRoutineCompleteRequest {
    @NotNull
    private int day;

    @NotNull
    private boolean completed;

    public int getDay() {
        return day;
    }

    public boolean isCompleted() {
        return completed;
    }
}
