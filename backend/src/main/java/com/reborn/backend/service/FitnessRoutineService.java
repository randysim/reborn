package com.reborn.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.FitnessRoutineRequest;
import com.reborn.backend.model.FitnessRoutine;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.FitnessRoutineRepository;
import com.reborn.backend.repository.UserRepository;

@Service
public class FitnessRoutineService {
    private final FitnessRoutineRepository fitnessRoutineRepository;
    private final UserRepository userRepository;

    public FitnessRoutineService(FitnessRoutineRepository fitnessRoutineRepository, UserRepository userRepository) {
        this.fitnessRoutineRepository = fitnessRoutineRepository;
        this.userRepository = userRepository;
    }

    public FitnessRoutine createFitnessRoutine(FitnessRoutineRequest fitnessRoutineRequest, User user) {
        FitnessRoutine fitnessRoutine = new FitnessRoutine(fitnessRoutineRequest.getTitle(), fitnessRoutineRequest.getDescription(), user);
        return fitnessRoutineRepository.save(fitnessRoutine);
    }

    public void deleteFitnessRoutine(Long id, User user) {
        FitnessRoutine fitnessRoutine = fitnessRoutineRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fitness routine not found"));

        if (!fitnessRoutine.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this fitness routine");
        }

        fitnessRoutineRepository.delete(fitnessRoutine);
    }

    public List<FitnessRoutine> getFitnessRoutines(User user) {
        return fitnessRoutineRepository.findByUser(user);
    }

    public FitnessRoutine updateFitnessRoutine(FitnessRoutineRequest fitnessRoutineRequest, User user) {
        if (fitnessRoutineRequest.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fitness routine ID is required");
        }

        FitnessRoutine fitnessRoutine = fitnessRoutineRepository.findById(fitnessRoutineRequest.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fitness routine not found"));

        if (!fitnessRoutine.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this fitness routine");
        }

        fitnessRoutine.setTitle(fitnessRoutineRequest.getTitle());
        fitnessRoutine.setDescription(fitnessRoutineRequest.getDescription());

        return fitnessRoutineRepository.save(fitnessRoutine);
    }

    public FitnessRoutine getFitnessRoutine(Long id, User user) {
        FitnessRoutine fitnessRoutine = fitnessRoutineRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fitness routine not found"));

        if (!fitnessRoutine.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to view this fitness routine");
        }

        return fitnessRoutine;
    }
    
    public void setFitnessRoutine(Long id, int day, User user) {
        FitnessRoutine fitnessRoutine = fitnessRoutineRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fitness routine not found"));

        if (!fitnessRoutine.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to set this fitness routine");
        }

        user.getFitnessSchedule()[day] = id;
        userRepository.save(user);
    }

    public void completeFitnessRoutine(Long id, int day, boolean completed, User user) {
        FitnessRoutine fitnessRoutine = fitnessRoutineRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fitness routine not found"));

        if (!fitnessRoutine.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to complete this fitness routine");
        }

        user.getFitnessScheduleCompleted()[day] = completed;
        userRepository.save(user);
    }
}
