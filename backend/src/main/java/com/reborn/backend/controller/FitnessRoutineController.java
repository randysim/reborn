package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.FitnessRoutineService;
import com.reborn.backend.security.GoogleOAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.model.FitnessRoutine;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.reborn.backend.service.UserService;

@RestController
@RequestMapping("/api/fitness")
public class FitnessRoutineController {
    private final FitnessRoutineService fitnessRoutineService;
    private final UserService userService;
    
    public FitnessRoutineController(FitnessRoutineService fitnessRoutineService, UserService userService) {
        this.fitnessRoutineService = fitnessRoutineService;
        this.userService = userService;
    }

    @GetMapping
    public List<FitnessRoutine> getFitnessRoutines(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return fitnessRoutineService.getFitnessRoutines(userService.getAuthenticatedUser(googleOAuth2User));
    }
}
