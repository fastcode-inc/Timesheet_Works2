package com.fastcode.example.application.core.timesheetdetails.dto;

import java.math.BigDecimal;
import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTimesheetdetailsInput {

    private BigDecimal hours;

    @NotNull(message = "id Should not be null")
    private Long id;

    private String notes;

    @NotNull(message = "workdate Should not be null")
    private LocalDate workdate;

    private Long taskid;
    private Long timeofftypeid;
    private Long timesheetid;
    private Long versiono;
}
