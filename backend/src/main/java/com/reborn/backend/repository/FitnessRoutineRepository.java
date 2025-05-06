package com.reborn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.FitnessRoutine;

@Repository
public interface FitnessRoutineRepository extends JpaRepository<FitnessRoutine, Long> {
    
}
