package com.reborn.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.CheatDayRequest;
import com.reborn.backend.model.CheatDay;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.CheatDayRepository;
import com.reborn.backend.repository.UserRepository;

@Service
public class CheatDayService {
    private final CheatDayRepository cheatDayRepository;
    private final UserRepository userRepository;

    public CheatDayService(CheatDayRepository cheatDayRepository, UserRepository userRepository) {
        this.cheatDayRepository = cheatDayRepository;
        this.userRepository = userRepository;
    }
    
    public void createCheatDay(CheatDayRequest cheatDayRequest, User user) {
        if (user.getCheatDays() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have no cheat days left");
        }

        if (!cheatDayRequest.getDate().isAfter(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot create a cheat day from the past or today.");
        }

        if (cheatDayRepository.findByDateAndUser(cheatDayRequest.getDate(), user).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already have a cheat day on this date");
        }

        CheatDay cheatDay = new CheatDay(cheatDayRequest.getDate(), user);
        cheatDayRepository.save(cheatDay);

        user.setCheatDays(user.getCheatDays() - 1);
        userRepository.save(user);
    }

    public List<CheatDay> getCheatDays(User user) {
        return cheatDayRepository.findByUser(user);
    }

    public void deleteCheatDay(Long id, User user) {
        CheatDay cheatDay = cheatDayRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cheat day not found"));

        if (!cheatDay.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this cheat day");
        }

        if (!cheatDay.getDate().isAfter(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot delete a cheat day from the past");
        }

        cheatDayRepository.delete(cheatDay);
        user.setCheatDays(user.getCheatDays() + 1);
        userRepository.save(user);
    }

    public boolean isTodayCheatDay(User user) {
        LocalDate today = LocalDate.now();
        return cheatDayRepository.findByDateAndUser(today, user)
            .isPresent();
    }
}
