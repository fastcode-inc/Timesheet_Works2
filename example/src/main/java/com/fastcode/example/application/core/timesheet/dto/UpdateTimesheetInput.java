package com.fastcode.example.application.core.timesheet.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTimesheetInput {

    @NotNull(message = "id Should not be null")
    private Long id;

    private String notes;

    @NotNull(message = "periodendingdate Should not be null")
    private LocalDate periodendingdate;

    @NotNull(message = "periodstartingdate Should not be null")
    private LocalDate periodstartingdate;

    private Long timesheetstatusid;
    private Long userid;
    private Long versiono;
}
