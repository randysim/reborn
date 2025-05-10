package com.reborn.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reborn.backend.service.ConnectionService;
import com.reborn.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.security.GoogleOAuth2User;
import com.reborn.backend.model.Connection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.ConnectionRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import com.reborn.backend.dto.outbound.SuccessResponse;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {
    private final ConnectionService connectionService;
    private final UserService userService;

    public ConnectionController(ConnectionService connectionService, UserService userService) {
        this.connectionService = connectionService;
        this.userService = userService;
    }

    @PostMapping
    public Connection createConnection(
        @RequestBody ConnectionRequest connectionRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        return connectionService.createConnection(
            connectionRequest, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteConnection(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        connectionService.deleteConnection(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }

    @GetMapping
    public List<Connection> getConnections(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return connectionService.getConnections(userService.getAuthenticatedUser(googleOAuth2User));
    }

    @PostMapping("/{id}/accept")
    public SuccessResponse acceptConnection(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        connectionService.acceptConnection(id, userService.getAuthenticatedUser(googleOAuth2User));

        return new SuccessResponse(true);
    }

    @PostMapping("/{id}/reject")
    public SuccessResponse rejectConnection(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        connectionService.deleteConnection(
            id, 
            userService.getAuthenticatedUser(googleOAuth2User)
        );

        return new SuccessResponse(true);
    }
}
