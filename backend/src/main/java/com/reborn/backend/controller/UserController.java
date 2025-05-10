package com.reborn.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reborn.backend.model.User;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.service.UserService;
import com.reborn.backend.dto.inbound.UserUpdateRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PutMapping("/me")
    public User updateUser(@RequestBody UserUpdateRequest userUpdateRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        User user = userService.getAuthenticatedUser(googleOAuth2User);
        userService.updateUser(userUpdateRequest, user);
        return user;
    }

    @PutMapping("/me/onboard")
    public User onboardUser(@RequestBody UserUpdateRequest userUpdateRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        User user = userService.getAuthenticatedUser(googleOAuth2User);
        userService.onboardUser(userUpdateRequest, user);
        return user;
    }
}