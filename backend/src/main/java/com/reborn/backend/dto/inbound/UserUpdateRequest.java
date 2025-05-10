package com.reborn.backend.dto.inbound;

import java.time.LocalDate;

public class UserUpdateRequest {
    private String timezone;
    private String username;
    private LocalDate birthDate;

    public String getTimezone() {
        return timezone;
    }

    public String getUsername() {
        return username;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }
}

