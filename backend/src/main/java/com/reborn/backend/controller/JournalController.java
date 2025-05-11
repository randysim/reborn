package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.JournalService;
import com.reborn.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.model.Journal;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.JournalRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.reborn.backend.dto.outbound.SuccessResponse;
import com.reborn.backend.dto.outbound.JournalResponse;

@RestController
@RequestMapping("/api/journals")
public class JournalController {
    private final JournalService journalService;
    private final UserService userService;

    public JournalController(JournalService journalService, UserService userService) {
        this.journalService = journalService;
        this.userService = userService;
    }
    
    @GetMapping
    public JournalResponse getJournalByDate(
        @RequestParam("date") String date,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new JournalResponse(
            journalService.getJournalByDate(
                LocalDate.parse(date), 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PostMapping
    public JournalResponse createJournal(
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new JournalResponse(
            journalService.createJournal(
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PutMapping("/{id}")
    public JournalResponse updateJournal(
        @PathVariable Long id,
        @RequestBody JournalRequest journalRequest,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new JournalResponse(
            journalService.updateJournal(
                id,
                journalRequest,
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteJournal(
        @PathVariable Long id,
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        journalService.deleteJournal(
            id,
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }
}