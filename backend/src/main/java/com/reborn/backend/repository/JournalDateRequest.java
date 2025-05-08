package com.reborn.backend.repository;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class JournalDateRequest {
    @NotNull
    private LocalDate date;

    public LocalDate getDate() {
        return date;
    }
}
