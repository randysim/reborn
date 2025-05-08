package com.reborn.backend.dto.inbound;

import jakarta.validation.constraints.NotNull;

public class FitnessRoutineRequest {
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String description;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
