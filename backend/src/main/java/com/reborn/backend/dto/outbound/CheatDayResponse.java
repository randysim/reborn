package com.reborn.backend.dto.outbound;

import java.time.LocalDate;

import com.reborn.backend.model.CheatDay;

public class CheatDayResponse {
    private Long id;
    private LocalDate date;

    public CheatDayResponse(CheatDay cheatDay) {
        this.id = cheatDay.getId();
        this.date = cheatDay.getDate();
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }
}
