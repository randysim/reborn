package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.GoalService;
import com.reborn.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.reborn.backend.dto.inbound.GoalRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.reborn.backend.dto.outbound.SuccessResponse;
import com.reborn.backend.dto.outbound.GoalResponse;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/goals")
public class GoalController {
    private final GoalService goalService;
    private final UserService userService;

    public GoalController(GoalService goalService, UserService userService) {
        this.goalService = goalService;
        this.userService = userService;
    }
    
    @GetMapping
    public List<GoalResponse> getGoals(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return goalService.getGoals(
            userService.getAuthenticatedUser(googleOAuth2User)
        )
        .stream()
        .map(GoalResponse::new)
        .collect(Collectors.toList());
    }

    @PostMapping
    public GoalResponse createGoal(
        @RequestBody GoalRequest goalRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new GoalResponse(
            goalService.createGoal(
                goalRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PutMapping("/{id}")
    public GoalResponse updateGoal(
        @PathVariable Long id, 
        @RequestBody GoalRequest goalRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new GoalResponse(
            goalService.updateGoal(
                id, 
                goalRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteGoal(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        goalService.deleteGoal(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }

    @PostMapping("/{id}/complete")
    public SuccessResponse completeGoal(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        goalService.completeGoal(
            id, 
            true, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }

    @PostMapping("/{id}/uncomplete")
    public SuccessResponse uncompleteGoal(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        goalService.completeGoal(
            id, 
            false, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }
}
