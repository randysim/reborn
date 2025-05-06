package com.reborn.backend.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.model.Attendance;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.AttendanceRepository;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance getAttendance(Long id) {
        Optional<Attendance> attendanceOptional = attendanceRepository.findById(id);
        if (attendanceOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found.");
        }
        return attendanceOptional.get();
    }

    public Attendance takeAttendance(User user) {
        Long userId = user.getId();
        LocalDate today = LocalDate.now();
        Optional<Attendance> attendanceOptional = attendanceRepository.findByUserIdAndDate(userId, today);
        if (attendanceOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attendance not found for today.");
        }
        Attendance attendance = attendanceOptional.get();
        attendance.setTaken(true);
        return attendanceRepository.save(attendance);
    }
}
