package com.fastcode.example.application.core.usertask.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetTaskOutput {

    private String description;
    private Long id;
    private Boolean isactive;
    private String name;
    private Long usertaskTaskid;
    private Long usertaskUserid;
}
