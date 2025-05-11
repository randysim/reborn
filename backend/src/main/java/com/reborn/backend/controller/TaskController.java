package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.TaskService;
import com.reborn.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.TaskRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.reborn.backend.dto.outbound.TaskResponse;
import java.util.stream.Collectors;
import com.reborn.backend.dto.outbound.SuccessResponse;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }
    
    @GetMapping
    public List<TaskResponse> getTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasks(
            userService.getAuthenticatedUser(googleOAuth2User)
        )
            .stream()
            .map(TaskResponse::new)
            .collect(Collectors.toList());
    }

    @GetMapping("/completed")
    public List<TaskResponse> getCompletedTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasksByUserAndCompleted(
            userService.getAuthenticatedUser(googleOAuth2User), 
            true
        )
            .stream()
            .map(TaskResponse::new)
            .collect(Collectors.toList());
    }

    @GetMapping("/incomplete")
    public List<TaskResponse> getIncompleteTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasksByUserAndCompleted(
            userService.getAuthenticatedUser(googleOAuth2User), 
            false
        )
            .stream()
            .map(TaskResponse::new)
            .collect(Collectors.toList());
    }

    @PostMapping
    public TaskResponse createTask(
        @RequestBody TaskRequest taskRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new TaskResponse(
            taskService.createTask(
                taskRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PostMapping("/complete/{id}")
    public TaskResponse completeTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new TaskResponse(
            taskService.completeTask(
                id, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PostMapping("/uncomplete/{id}")
    public TaskResponse uncompleteTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new TaskResponse(
            taskService.uncompleteTask(
                id, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(
        @PathVariable Long id,
        @RequestBody TaskRequest taskRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new TaskResponse(
            taskService.updateTask(
                id, 
                taskRequest, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        taskService.deleteTask(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }
}
