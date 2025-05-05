package com.reborn.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reborn.backend.model.User;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public User getUser(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return userService.getAuthenticatedUser(googleOAuth2User);
    }
}