package com.fastcode.example.application.core.timesheet;

import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
import java.time.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ITimesheetMapper {
    Timesheet createTimesheetInputToTimesheet(CreateTimesheetInput timesheetDto);

    @Mappings(
        {
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusid"),
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "userid"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    CreateTimesheetOutput timesheetToCreateTimesheetOutput(Timesheet entity);

    Timesheet updateTimesheetInputToTimesheet(UpdateTimesheetInput timesheetDto);

    @Mappings(
        {
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusid"),
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "userid"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    UpdateTimesheetOutput timesheetToUpdateTimesheetOutput(Timesheet entity);

    @Mappings(
        {
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusid"),
            @Mapping(source = "entity.timesheetstatus.id", target = "timesheetstatusDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "userid"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    FindTimesheetByIdOutput timesheetToFindTimesheetByIdOutput(Timesheet entity);

    @Mappings(
        {
            @Mapping(source = "timesheetstatus.id", target = "id"),
            @Mapping(source = "foundTimesheet.id", target = "timesheetId"),
        }
    )
    GetTimesheetstatusOutput timesheetstatusToGetTimesheetstatusOutput(
        Timesheetstatus timesheetstatus,
        Timesheet foundTimesheet
    );

    @Mappings(
        { @Mapping(source = "users.id", target = "id"), @Mapping(source = "foundTimesheet.id", target = "timesheetId") }
    )
    GetUsersOutput usersToGetUsersOutput(Users users, Timesheet foundTimesheet);
}
