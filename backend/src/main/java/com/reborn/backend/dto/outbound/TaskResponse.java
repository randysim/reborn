package com.reborn.backend.dto.outbound;

import java.time.LocalDateTime;

import com.reborn.backend.model.Task;

public class TaskResponse {
    private Long id;
    private String description;
    private boolean completed;
    private Task.Priority priority;
    private Task.Difficulty difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private int recurring;
    
    public TaskResponse(Task task) {
        this.id = task.getId();
        this.description = task.getDescription();
        this.completed = task.isCompleted();
        this.priority = task.getPriority();
        this.difficulty = task.getDifficulty();
        this.createdAt = task.getCreatedAt();
        this.dueDate = task.getDueDate();
        this.recurring = task.getRecurring();
    }
    
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public Task.Priority getPriority() {
        return priority;
    }

    public Task.Difficulty getDifficulty() {
        return difficulty;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public int getRecurring() {
        return recurring;
    }
}
