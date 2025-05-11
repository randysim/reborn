package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reborn.backend.service.AttendanceService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.service.UserService;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.reborn.backend.dto.outbound.AttendanceResponse;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;
    private final UserService userService;

    public AttendanceController(AttendanceService attendanceService, UserService userService) {
        this.attendanceService = attendanceService;
        this.userService = userService;
    }

    @GetMapping
    public AttendanceResponse getAttendance(@RequestParam LocalDate date, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return new AttendanceResponse(
            attendanceService.getAttendance(date, userService.getAuthenticatedUser(googleOAuth2User))
        );
    }
    
    @PostMapping
    public AttendanceResponse takeAttendance(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return new AttendanceResponse(
            attendanceService.takeAttendance(
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }
    
}
