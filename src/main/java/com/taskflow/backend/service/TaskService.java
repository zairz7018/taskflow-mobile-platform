package com.taskflow.backend.service;

import com.taskflow.backend.dto.StatusUpdateRequest;
import com.taskflow.backend.dto.TaskRequest;
import com.taskflow.backend.dto.TaskResponse;
import com.taskflow.backend.entity.Task;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.Role;
import com.taskflow.backend.enums.TaskStatus;
import com.taskflow.backend.exception.BadRequestException;
import com.taskflow.backend.exception.ForbiddenActionException;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.repository.TaskRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    public TaskResponse createTask(TaskRequest request) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.CLIENT);

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .deadline(request.getDeadline())
                .status(TaskStatus.EN_ATTENTE)
                .createdBy(currentUser)
                .assignedTo(null)
                .build();

        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public List<TaskResponse> getMyTasks() {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.CLIENT);

        return taskRepository.findByCreatedById(currentUser.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.CLIENT);

        Task task = findTask(taskId);
        if (!Objects.equals(task.getCreatedBy().getId(), currentUser.getId())) {
            throw new ForbiddenActionException("You can update only your own tasks");
        }
        if (task.getStatus() != TaskStatus.EN_ATTENTE) {
            throw new BadRequestException("Task can be updated only when status is EN_ATTENTE");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        task.setDeadline(request.getDeadline());

        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public void deleteTask(Long taskId) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.CLIENT);

        Task task = findTask(taskId);
        if (!Objects.equals(task.getCreatedBy().getId(), currentUser.getId())) {
            throw new ForbiddenActionException("You can delete only your own tasks");
        }
        if (task.getStatus() != TaskStatus.EN_ATTENTE) {
            throw new BadRequestException("Task can be deleted only when status is EN_ATTENTE");
        }
        if (task.getAssignedTo() != null) {
            throw new BadRequestException("Task cannot be deleted after assignment");
        }

        taskRepository.delete(task);
    }

    public List<TaskResponse> getAvailableTasks() {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.EMPLOYE);

        return taskRepository.findByStatusAndAssignedToIsNull(TaskStatus.EN_ATTENTE)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse takeTask(Long taskId) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.EMPLOYE);

        Task task = findTask(taskId);
        if (task.getStatus() != TaskStatus.EN_ATTENTE) {
            throw new BadRequestException("Task is not available");
        }
        if (task.getAssignedTo() != null) {
            throw new BadRequestException("Task is already assigned");
        }

        task.setAssignedTo(currentUser);
        task.setStatus(TaskStatus.PRISE_EN_CHARGE);

        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public List<TaskResponse> getMyAssignedTasks() {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.EMPLOYE);

        return taskRepository.findByAssignedToId(currentUser.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse updateStatus(Long taskId, StatusUpdateRequest request) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.EMPLOYE);

        Task task = findTask(taskId);
        if (task.getAssignedTo() == null) {
            throw new BadRequestException("Task is not assigned");
        }
        if (!Objects.equals(task.getAssignedTo().getId(), currentUser.getId())) {
            throw new ForbiddenActionException("You can update only your assigned tasks");
        }

        TaskStatus status = request.getStatus();
        if (status != TaskStatus.EN_COURS && status != TaskStatus.TERMINEE) {
            throw new BadRequestException("Only EN_COURS or TERMINEE are allowed");
        }

        task.setStatus(status);
        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public TaskResponse closeTask(Long taskId) {
        User currentUser = userService.getCurrentUser();
        ensureRole(currentUser, Role.EMPLOYE);

        Task task = findTask(taskId);
        if (task.getAssignedTo() == null || !Objects.equals(task.getAssignedTo().getId(), currentUser.getId())) {
            throw new ForbiddenActionException("You can close only your assigned tasks");
        }

        task.setStatus(TaskStatus.TERMINEE);
        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .deadline(task.getDeadline())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .createdById(task.getCreatedBy() != null ? task.getCreatedBy().getId() : null)
                .createdByName(task.getCreatedBy() != null ? task.getCreatedBy().getFullName() : null)
                .assignedToId(task.getAssignedTo() != null ? task.getAssignedTo().getId() : null)
                .assignedToName(task.getAssignedTo() != null ? task.getAssignedTo().getFullName() : null)
                .build();
    }

    private Task findTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    private void ensureRole(User user, Role role) {
        if (user.getRole() != role) {
            throw new ForbiddenActionException("Access denied");
        }
    }
}

