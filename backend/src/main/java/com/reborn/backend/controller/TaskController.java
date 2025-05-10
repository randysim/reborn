package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.TaskService;
import com.reborn.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.model.Task;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.TaskRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

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
    public List<Task> getTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasks(
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasksByUserAndCompleted(
            userService.getAuthenticatedUser(googleOAuth2User), 
            true
        );
    }

    @GetMapping("/incomplete")
    public List<Task> getIncompleteTasks(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.getTasksByUserAndCompleted(
            userService.getAuthenticatedUser(googleOAuth2User), 
            false
        );
    }

    @PostMapping
    public Task createTask(
        @RequestBody TaskRequest taskRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.createTask(
            taskRequest, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @PostMapping("/complete/{id}")
    public Task completeTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.completeTask(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @PostMapping("/uncomplete/{id}")
    public Task uncompleteTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.uncompleteTask(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @PutMapping("/{id}")
    public Task updateTask(
        @PathVariable Long id,
        @RequestBody TaskRequest taskRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return taskService.updateTask(
            id, 
            taskRequest, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @DeleteMapping("/{id}")
    public void deleteTask(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        taskService.deleteTask(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }
}
