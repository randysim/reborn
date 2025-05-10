package com.reborn.backend.schedulers;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.UserRepository;
import java.util.List;
import java.time.ZoneId;
import java.time.LocalDateTime;
import java.time.DayOfWeek;

@Component
public class MainScheduler {
    private final UserRepository userRepository;

    public MainScheduler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 * * * *") // Run every hour
    public void mainTask() {
        List<User> users = userRepository.findAll();

        resetFitnessSchedules(users);
    }

    private void resetFitnessSchedules(List<User> users) {
        for (User user : users) {
            String timezone = user.getTimezone();
            if (timezone == null) {
                timezone = "UTC"; // Default to UTC if timezone not set
            }

            LocalDateTime userTime = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime();

            if (userTime.getDayOfWeek() == DayOfWeek.MONDAY && 
                userTime.getHour() == 0 && 
                userTime.getMinute() == 0) {

                for (int i = 0; i < 7; i++) {
                    user.getFitnessScheduleCompleted()[i] = false;
                }

                userRepository.save(user);
            }
        }
    }
}
