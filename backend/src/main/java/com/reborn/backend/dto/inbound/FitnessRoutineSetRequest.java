package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class FitnessRoutineSetRequest {
    @NotNull
    private int day;

    public int getDay() {
        return day;
    }
}