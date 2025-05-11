package com.reborn.backend.dto.outbound;

import java.time.LocalDateTime;

import com.reborn.backend.model.Goal;

public class GoalResponse {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime createdAt;
    private Goal.Difficulty difficulty;

    public GoalResponse(Goal goal) {
        this.id = goal.getId();
        this.title = goal.getTitle();
        this.description = goal.getDescription();
        this.completed = goal.isCompleted();
        this.createdAt = goal.getCreatedAt();
        this.difficulty = goal.getDifficulty();
    }
    
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Goal.Difficulty getDifficulty() {
        return difficulty;
    }
}
