package com.fastcode.example.application.core.project.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetCustomerOutput {

    private Long customerid;
    private String description;
    private Boolean isactive;
    private String name;
    private Long projectId;
}
