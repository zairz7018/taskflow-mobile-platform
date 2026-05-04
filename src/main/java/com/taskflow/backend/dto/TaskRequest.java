package com.taskflow.backend.dto;

import com.taskflow.backend.enums.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequest {

    @NotBlank
    private String title;

    private String description;

    private TaskPriority priority;

    private LocalDate deadline;
}

