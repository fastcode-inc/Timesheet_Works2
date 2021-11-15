package com.fastcode.example.application.core.timesheetdetails.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetTimesheetOutput {

    private Long id;
    private String notes;
    private LocalDate periodendingdate;
    private LocalDate periodstartingdate;
    private Long timesheetdetailsId;
}
