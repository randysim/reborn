package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class FitnessRoutineRequest {
    @NotNull
    private String title;
    @NotNull
    private String description;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
