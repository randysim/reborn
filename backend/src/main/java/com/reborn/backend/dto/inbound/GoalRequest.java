package com.reborn.backend.dto.inbound;

import com.reborn.backend.model.Goal.Difficulty;

import jakarta.validation.constraints.NotNull;

public class GoalRequest {
    private Long id;
    
    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Difficulty difficulty;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }   

    public String getDescription() {
        return description;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }
}
