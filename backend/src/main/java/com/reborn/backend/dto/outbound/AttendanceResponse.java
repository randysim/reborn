package com.reborn.backend.dto.outbound;

import java.time.LocalDate;

import com.reborn.backend.model.Attendance;

public class AttendanceResponse {
    private LocalDate date;
    private boolean taken;

    public AttendanceResponse(Attendance attendance) {
        this.date = attendance.getDate();
        this.taken = attendance.isTaken();
    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isTaken() {
        return taken;
    }
}