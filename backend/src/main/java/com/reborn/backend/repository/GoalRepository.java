package com.reborn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
}
