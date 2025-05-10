package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.CheatDayService;
import com.reborn.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.model.CheatDay;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.CheatDayRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import com.reborn.backend.dto.outbound.SuccessResponse;

@RestController
@RequestMapping("/api/cheat")
public class CheatDayController {
    private final CheatDayService cheatDayService;
    private final UserService userService;

    public CheatDayController(CheatDayService cheatDayService, UserService userService) {
        this.cheatDayService = cheatDayService;
        this.userService = userService;
    }

    @GetMapping
    public List<CheatDay> getCheatDays(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return cheatDayService.getCheatDays(userService.getAuthenticatedUser(googleOAuth2User));
    }

    @GetMapping("/today")
    public boolean isTodayCheatDay(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return cheatDayService.isTodayCheatDay(userService.getAuthenticatedUser(googleOAuth2User));
    }

    @PostMapping
    public CheatDay createCheatDay(@RequestBody CheatDayRequest cheatDayRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return cheatDayService.createCheatDay(cheatDayRequest, userService.getAuthenticatedUser(googleOAuth2User));
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteCheatDay(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        cheatDayService.deleteCheatDay(id, userService.getAuthenticatedUser(googleOAuth2User));
        
        return new SuccessResponse(true);
    }
}
