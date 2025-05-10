package com.reborn.backend.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.model.User;
import com.reborn.backend.repository.UserRepository;
import com.reborn.backend.security.GoogleOAuth2User;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        return userOptional.get();
    }

    public void processOAuthPostLogin(GoogleOAuth2User googleOAuth2User) {
        processOAuthPostLogin(googleOAuth2User, "UTC");
    }

    public void processOAuthPostLogin(GoogleOAuth2User googleOAuth2User, String timezone) {
        String name = googleOAuth2User.getName();
        String email = googleOAuth2User.getEmail();

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            // Create user
            User newUser = new User(
                    name,
                    email
            );
            newUser.setTimezone(timezone);
            userRepository.save(newUser);
        } else {
            // Update existing user's timezone
            User existingUser = userOptional.get();
            existingUser.setTimezone(timezone);
            userRepository.save(existingUser);
        }
    }

    public User getAuthenticatedUser(GoogleOAuth2User principal) {
        String email = principal.getAttribute("email");

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        return userOptional.get();
    }
}
