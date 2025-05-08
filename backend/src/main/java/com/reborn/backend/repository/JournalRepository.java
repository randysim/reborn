package com.reborn.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.Journal;
import com.reborn.backend.model.User;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    Optional<Journal> findByDateAndUser(LocalDate date, User user);
    List<Journal> findByUser(User user);
}
