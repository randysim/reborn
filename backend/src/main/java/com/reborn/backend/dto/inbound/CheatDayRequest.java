package com.reborn.backend.dto.inbound;

import java.time.LocalDate;

public class CheatDayRequest {
    private LocalDate date;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
