package com.reborn.backend.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reborn.backend.model.Attendance;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.AttendanceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance getAttendance(LocalDate date, User user) {
        Optional<Attendance> attendanceOptional = attendanceRepository.findByDateAndUser(date, user);
        if (attendanceOptional.isEmpty()) {
            Attendance emptyAttendance = new Attendance(user, date, false);
            return emptyAttendance;
        }
        return attendanceOptional.get();
    }

    public Attendance takeAttendance(User user) {
        LocalDate today = LocalDate.now();

        if (getAttendance(today, user).isTaken()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attendance already taken for today.");
        }

        Attendance attendance = new Attendance(user, today, true);
        return attendanceRepository.save(attendance);
    }
}
