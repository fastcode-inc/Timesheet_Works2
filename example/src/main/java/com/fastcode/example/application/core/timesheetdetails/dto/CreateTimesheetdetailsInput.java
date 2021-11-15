package com.fastcode.example.application.core.timesheetdetails.dto;

import java.math.BigDecimal;
import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTimesheetdetailsInput {

    private BigDecimal hours;

    private String notes;

    @NotNull(message = "workdate Should not be null")
    private LocalDate workdate;

    private Long taskid;
    private Long timeofftypeid;
    private Long timesheetid;
}
