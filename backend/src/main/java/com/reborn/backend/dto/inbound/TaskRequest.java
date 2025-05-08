package com.reborn.backend.dto.inbound;

import java.time.LocalDateTime;

import com.reborn.backend.model.Task.Difficulty;
import com.reborn.backend.model.Task.Priority;

public class TaskRequest {
    private Long id;
    private String description;
    private int recurring;
    private LocalDateTime dueDate;
    private Difficulty difficulty;
    private Priority priority;

    public TaskRequest() {}

    public TaskRequest(String description, int recurring, LocalDateTime dueDate, Difficulty difficulty, Priority priority) {
        this.description = description;
        this.recurring = recurring;
        this.dueDate = dueDate;
        this.difficulty = difficulty;
        this.priority = priority;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public int getRecurring() {
        return recurring;
    }
    
    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public Priority getPriority() {
        return priority;
    }
}