package com.fastcode.example.application.core.task.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskOutput {

    private String description;
    private Long id;
    private Boolean isactive;
    private String name;
    private Long projectid;
    private Long projectDescriptiveField;
}
