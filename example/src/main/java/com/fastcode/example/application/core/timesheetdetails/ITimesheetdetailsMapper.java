package com.fastcode.example.application.core.timesheetdetails;

import com.fastcode.example.application.core.timesheetdetails.dto.*;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import java.time.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ITimesheetdetailsMapper {
    Timesheetdetails createTimesheetdetailsInputToTimesheetdetails(CreateTimesheetdetailsInput timesheetdetailsDto);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskid"),
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeid"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeDescriptiveField"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetid"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetDescriptiveField"),
        }
    )
    CreateTimesheetdetailsOutput timesheetdetailsToCreateTimesheetdetailsOutput(Timesheetdetails entity);

    Timesheetdetails updateTimesheetdetailsInputToTimesheetdetails(UpdateTimesheetdetailsInput timesheetdetailsDto);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskid"),
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeid"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeDescriptiveField"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetid"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetDescriptiveField"),
        }
    )
    UpdateTimesheetdetailsOutput timesheetdetailsToUpdateTimesheetdetailsOutput(Timesheetdetails entity);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskid"),
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeid"),
            @Mapping(source = "entity.timeofftype.id", target = "timeofftypeDescriptiveField"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetid"),
            @Mapping(source = "entity.timesheet.id", target = "timesheetDescriptiveField"),
        }
    )
    FindTimesheetdetailsByIdOutput timesheetdetailsToFindTimesheetdetailsByIdOutput(Timesheetdetails entity);

    @Mappings(
        {
            @Mapping(source = "task.id", target = "id"),
            @Mapping(source = "foundTimesheetdetails.id", target = "timesheetdetailsId"),
        }
    )
    GetTaskOutput taskToGetTaskOutput(Task task, Timesheetdetails foundTimesheetdetails);

    @Mappings(
        {
            @Mapping(source = "timesheet.id", target = "id"),
            @Mapping(source = "timesheet.notes", target = "notes"),
            @Mapping(source = "foundTimesheetdetails.id", target = "timesheetdetailsId"),
        }
    )
    GetTimesheetOutput timesheetToGetTimesheetOutput(Timesheet timesheet, Timesheetdetails foundTimesheetdetails);

    @Mappings(
        {
            @Mapping(source = "timeofftype.id", target = "id"),
            @Mapping(source = "foundTimesheetdetails.id", target = "timesheetdetailsId"),
        }
    )
    GetTimeofftypeOutput timeofftypeToGetTimeofftypeOutput(
        Timeofftype timeofftype,
        Timesheetdetails foundTimesheetdetails
    );
}
