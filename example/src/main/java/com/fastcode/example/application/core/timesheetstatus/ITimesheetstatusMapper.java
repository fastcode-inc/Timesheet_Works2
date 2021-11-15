package com.fastcode.example.application.core.timesheetstatus;

import com.fastcode.example.application.core.timesheetstatus.dto.*;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
import java.time.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ITimesheetstatusMapper {
    Timesheetstatus createTimesheetstatusInputToTimesheetstatus(CreateTimesheetstatusInput timesheetstatusDto);
    CreateTimesheetstatusOutput timesheetstatusToCreateTimesheetstatusOutput(Timesheetstatus entity);

    Timesheetstatus updateTimesheetstatusInputToTimesheetstatus(UpdateTimesheetstatusInput timesheetstatusDto);

    UpdateTimesheetstatusOutput timesheetstatusToUpdateTimesheetstatusOutput(Timesheetstatus entity);
    FindTimesheetstatusByIdOutput timesheetstatusToFindTimesheetstatusByIdOutput(Timesheetstatus entity);
}
