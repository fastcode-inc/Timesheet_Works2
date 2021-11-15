package com.fastcode.example.application.core.timesheetstatus.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class CreateTimesheetstatusInput {

    @NotNull(message = "statusname Should not be null")
    @Length(max = 255, message = "statusname must be less than 255 characters")
    private String statusname;
}
