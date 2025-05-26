package com.reborn.backend.dto.outbound;

import com.reborn.backend.model.Connection;

public class ConnectionResponse {
    private Long id;
    private UserNonSensitive user1;
    private UserNonSensitive user2;
    private boolean active;
    
    public ConnectionResponse(Connection connection) {
        this.id = connection.getId();
        this.user1 = new UserNonSensitive(connection.getUser1());
        this.user2 = new UserNonSensitive(connection.getUser2());
        this.active = connection.isActive();
    }

    public Long getId() {
        return id;
    }

    public UserNonSensitive getUser1() {
        return user1;
    }

    public UserNonSensitive getUser2() {
        return user2;
    }

    public boolean isActive() {
        return active;
    }
}
