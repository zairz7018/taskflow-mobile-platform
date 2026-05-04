package com.taskflow.backend.repository;

import com.taskflow.backend.entity.Task;
import com.taskflow.backend.enums.TaskStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCreatedById(Long clientId);

    List<Task> findByAssignedToId(Long employeId);

    List<Task> findByStatusAndAssignedToIsNull(TaskStatus status);
}

