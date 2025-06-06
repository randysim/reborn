package com.reborn.backend.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.Attendance;
import com.reborn.backend.model.User;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByDateAndUser(LocalDate date, User user);
} 