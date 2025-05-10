package com.schedulers;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.UserRepository;
import java.util.List;

@Component
public class WeeklyTask {
    private final UserRepository userRepository;

    public WeeklyTask(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 0 * * MON")
    public void runWeeklyTask() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            // reset all fitness schedule to false
            for (int i = 0; i < 7; i++) {
                user.getFitnessScheduleCompleted()[i] = false;
            }

            userRepository.save(user);   
        }
    }
}
