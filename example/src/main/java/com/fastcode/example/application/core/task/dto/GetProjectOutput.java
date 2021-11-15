package com.fastcode.example.application.core.task.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetProjectOutput {

    private String description;
    private LocalDate enddate;
    private Long id;
    private String name;
    private LocalDate startdate;
    private Long taskId;
}
