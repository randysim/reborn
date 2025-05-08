package com.reborn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.FitnessRoutine;
import com.reborn.backend.model.User;

@Repository
public interface FitnessRoutineRepository extends JpaRepository<FitnessRoutine, Long> {
    List<FitnessRoutine> findByUser(User user);
}
