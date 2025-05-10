package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.BalanceSheetService;
import org.springframework.web.bind.annotation.GetMapping;
import com.reborn.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.dto.outbound.BalanceSheetItemsResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.BalanceSheetItemBulkRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.reborn.backend.dto.inbound.BalanceSheetDeleteRequest;
import com.reborn.backend.dto.outbound.SuccessResponse;

@RestController
@RequestMapping("/api/balance")
public class BalanceSheetController {
    private final BalanceSheetService balanceSheetService;
    private final UserService userService;

    public BalanceSheetController(BalanceSheetService balanceSheetService, UserService userService) {
        this.balanceSheetService = balanceSheetService;
        this.userService = userService;
    }

    @GetMapping
    public BalanceSheetItemsResponse getBalanceSheetItems(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return new BalanceSheetItemsResponse(
            balanceSheetService.getBalanceSheetItems(
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @PostMapping
    public BalanceSheetItemsResponse upsertBalanceSheetItems(
        @RequestBody BalanceSheetItemBulkRequest balanceSheetItemRequests, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return new BalanceSheetItemsResponse(
            balanceSheetService.updateOrCreateBalanceSheetItems(
                balanceSheetItemRequests, 
                userService.getAuthenticatedUser(googleOAuth2User)
            )
        );
    }

    @DeleteMapping
    public SuccessResponse deleteBalanceSheetItems(@RequestBody BalanceSheetDeleteRequest balanceSheetDeleteRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        balanceSheetService.deleteBalanceSheetItems(
            balanceSheetDeleteRequest.getIds(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }
}
