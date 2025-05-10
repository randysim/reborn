package com.reborn.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.GoalRequest;
import com.reborn.backend.model.Goal;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.GoalRepository;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }
    
    public Goal createGoal(GoalRequest goalRequest, User user) {
        Goal goal = new Goal(goalRequest.getTitle(), goalRequest.getDescription(), user, goalRequest.getDifficulty());
        return goalRepository.save(goal);
    }

    public Goal updateGoal(Long id,GoalRequest goalRequest, User user) {
        Goal goal = goalRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Goal not found"));

        if (!goal.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this goal");
        }

        goal.setTitle(goalRequest.getTitle());
        goal.setDescription(goalRequest.getDescription());
        goal.setDifficulty(goalRequest.getDifficulty());

        return goalRepository.save(goal);
    }

    public void deleteGoal(Long id, User user) {
        Goal goal = goalRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Goal not found"));

        if (!goal.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this goal");
        }

        goalRepository.delete(goal);
    }

    public List<Goal> getGoals(User user) {
        return goalRepository.findByUser(user);
    }
}
