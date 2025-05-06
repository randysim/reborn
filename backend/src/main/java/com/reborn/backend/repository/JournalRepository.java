package com.reborn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.Journal;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    
}
