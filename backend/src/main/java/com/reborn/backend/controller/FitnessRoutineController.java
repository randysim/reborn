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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.FitnessRoutineRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.reborn.backend.dto.outbound.SuccessResponse;
import org.springframework.web.bind.annotation.PutMapping;
import com.reborn.backend.dto.inbound.FitnessRoutineCompleteRequest;
import com.reborn.backend.dto.inbound.FitnessRoutineSetRequest;

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
    public List<FitnessRoutine> getFitnessRoutines(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return fitnessRoutineService.getFitnessRoutines(userService.getAuthenticatedUser(googleOAuth2User));
    }

    @PostMapping
    public FitnessRoutine createFitnessRoutine(
        @RequestBody FitnessRoutineRequest fitnessRoutineRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return fitnessRoutineService.createFitnessRoutine(
            fitnessRoutineRequest, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteFitnessRoutine(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        fitnessRoutineService.deleteFitnessRoutine(id, userService.getAuthenticatedUser(googleOAuth2User));
        return new SuccessResponse(true);
    }
    
    @PutMapping("/{id}")
    public FitnessRoutine updateFitnessRoutine(
        @PathVariable Long id, 
        @RequestBody FitnessRoutineRequest fitnessRoutineRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return fitnessRoutineService.updateFitnessRoutine(
            fitnessRoutineRequest, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @PostMapping("/{id}/complete")
    public SuccessResponse completeFitnessRoutine(
        @PathVariable Long id, 
        @RequestBody FitnessRoutineCompleteRequest fitnessRoutineCompleteRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        fitnessRoutineService.completeFitnessRoutine(
            id, 
            fitnessRoutineCompleteRequest.getDay(), 
            fitnessRoutineCompleteRequest.isCompleted(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
        return new SuccessResponse(true);
    }

    @PostMapping("/{id}/set")
    public SuccessResponse setFitnessRoutine(
        @PathVariable Long id, 
        @RequestBody FitnessRoutineSetRequest fitnessRoutineSetRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        fitnessRoutineService.setFitnessRoutine(
            id, 
            fitnessRoutineSetRequest.getDay(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
        return new SuccessResponse(true);
    }
}
