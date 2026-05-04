package com.taskflow.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.taskflow.backend.enums.TaskStatus;
import org.junit.jupiter.api.Test;

public class BasicTest {

    @Test
    void enumIsAvailable() {
        assertEquals(TaskStatus.EN_ATTENTE, TaskStatus.valueOf("EN_ATTENTE"));
    }
}

