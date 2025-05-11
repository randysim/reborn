package com.reborn.backend.dto.outbound;

import com.reborn.backend.model.User;

public class UserNonSensitive {
    private Long id;
    private String username;
    private String picture;

    public UserNonSensitive(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.picture = user.getPicture();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPicture() {
        return picture;
    }
}
