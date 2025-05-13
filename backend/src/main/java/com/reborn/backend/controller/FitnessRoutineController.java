package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.FitnessRoutineService;
import com.reborn.backend.security.GoogleOAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import com.reborn.backend.dto.outbound.FitnessRoutineResponse;
import java.util.stream.Collectors;

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
    public List<FitnessRoutineResponse> getFitnessRoutines(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return fitnessRoutineService.getFitnessRoutines(userService.getAuthenticatedUser(googleOAuth2User))
            .stream()
            .map(FitnessRoutineResponse::new)
            .collect(Collectors.toList());
    }

    @PostMapping
    public FitnessRoutineResponse createFitnessRoutine(
        @RequestBody FitnessRoutineRequest fitnessRoutineRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new FitnessRoutineResponse(
            fitnessRoutineService.createFitnessRoutine(
                fitnessRoutineRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteFitnessRoutine(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        fitnessRoutineService.deleteFitnessRoutine(id, userService.getAuthenticatedUser(googleOAuth2User));
        return new SuccessResponse(true);
    }
    
    @PutMapping("/{id}")
    public FitnessRoutineResponse updateFitnessRoutine(
        @PathVariable Long id, 
        @RequestBody FitnessRoutineRequest fitnessRoutineRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new FitnessRoutineResponse(
            fitnessRoutineService.updateFitnessRoutine(
                id,
                fitnessRoutineRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PostMapping("/complete")
    public SuccessResponse completeFitnessRoutine(
        @RequestBody FitnessRoutineCompleteRequest fitnessRoutineCompleteRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        fitnessRoutineService.completeFitnessRoutine(
            fitnessRoutineCompleteRequest.getDay(), 
            fitnessRoutineCompleteRequest.isCompleted(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
        return new SuccessResponse(true);
    }

    @PostMapping("/set")
    public SuccessResponse setFitnessRoutine(
        @RequestBody FitnessRoutineSetRequest fitnessRoutineSetRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        fitnessRoutineService.setFitnessRoutine(
            fitnessRoutineSetRequest.getId(), 
            fitnessRoutineSetRequest.getDay(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
        return new SuccessResponse(true);
    }
}
