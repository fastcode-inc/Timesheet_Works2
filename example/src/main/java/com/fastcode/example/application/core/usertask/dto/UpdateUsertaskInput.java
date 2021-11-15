package com.fastcode.example.application.core.usertask.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUsertaskInput {

    @NotNull(message = "taskid Should not be null")
    private Long taskid;

    @NotNull(message = "userid Should not be null")
    private Long userid;

    private Long versiono;
}
