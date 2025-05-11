package com.reborn.backend.dto.outbound;

import com.reborn.backend.model.FitnessRoutine;

public class FitnessRoutineResponse {
    private Long id;
    private String title;
    private String description;
    
    public FitnessRoutineResponse(FitnessRoutine fitnessRoutine) {
        this.id = fitnessRoutine.getId();
        this.title = fitnessRoutine.getTitle();
        this.description = fitnessRoutine.getDescription();
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
}
