package com.reborn.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.CheatDay;
import com.reborn.backend.model.User;

@Repository
public interface CheatDayRepository extends JpaRepository<CheatDay, Long> {
    List<CheatDay> findByUser(User user);
    Optional<CheatDay> findByDateAndUser(LocalDate date, User user);
}
