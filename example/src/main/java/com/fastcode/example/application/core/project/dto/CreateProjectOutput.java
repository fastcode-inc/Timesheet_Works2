package com.fastcode.example.application.core.project.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProjectOutput {

    private String description;
    private LocalDate enddate;
    private Long id;
    private String name;
    private LocalDate startdate;
    private Long customerid;
    private Long customerDescriptiveField;
}
