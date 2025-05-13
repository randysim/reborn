package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class FitnessRoutineSetRequest {
    @NotNull
    private int day;

    @NotNull
    private Long id;

    public int getDay() {
        return day;
    }

    public Long getId() {
        return id;
    }
}