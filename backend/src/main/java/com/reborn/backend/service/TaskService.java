package com.reborn.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.TaskRequest;
import com.reborn.backend.model.Task;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(TaskRequest taskRequest, User user) {
        Task task = new Task(
            taskRequest.getDescription(),
            taskRequest.getRecurring(),
            taskRequest.getDueDate(),
            taskRequest.getDifficulty(),
            taskRequest.getPriority(),
            user
        );

        return taskRepository.save(task);
    }

    public Task getTask(Long id, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        if (!task.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to view this task");
        }

        return task;
    }

    public List<Task> getTasks(User user) {
        return taskRepository.findByUser(user);
    }

    public List<Task> getTasksByUserAndCompleted(User user, boolean completed) {
        return taskRepository.findByUserAndCompleted(user, completed);
    }

    public Task updateTask(Long id,TaskRequest taskRequest, User user) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task ID is required");
        }

        Task existingTask = getTask(id, user);

        if (!existingTask.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this task");
        }

        existingTask.setDescription(taskRequest.getDescription());
        existingTask.setRecurring(taskRequest.getRecurring());
        existingTask.setDueDate(taskRequest.getDueDate());
        existingTask.setDifficulty(taskRequest.getDifficulty());
        existingTask.setPriority(taskRequest.getPriority());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id, User user) {
        Task existingTask = getTask(id, user);

        taskRepository.delete(existingTask);
    }

    public Task completeTask(Long id, User user) {
        Task existingTask = getTask(id, user);

        if (existingTask.isCompleted()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task is already completed");
        }

        if (existingTask.getRecurring() > 0) {
            TaskRequest taskRequest = new TaskRequest(
                existingTask.getDescription(),
                existingTask.getRecurring(),
                existingTask.getDueDate().plusDays(existingTask.getRecurring()),
                existingTask.getDifficulty(),
                existingTask.getPriority()
            );

            createTask(taskRequest, user);
        }

        // Only allow recurring for the most recent version of that task.
        existingTask.setRecurring(0);
        existingTask.setCompleted(true);

        return taskRepository.save(existingTask);
    }

    public Task uncompleteTask(Long id, User user) {
        Task existingTask = getTask(id, user);

        if (!existingTask.isCompleted()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task is not completed");
        }

        existingTask.setCompleted(false);
        return taskRepository.save(existingTask);
    }
}