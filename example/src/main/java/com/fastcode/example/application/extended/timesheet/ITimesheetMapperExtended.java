package com.fastcode.example.application.extended.timesheet;

import com.fastcode.example.application.core.timesheet.ITimesheetMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ITimesheetMapperExtended extends ITimesheetMapper {}
