package com.reborn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
}
