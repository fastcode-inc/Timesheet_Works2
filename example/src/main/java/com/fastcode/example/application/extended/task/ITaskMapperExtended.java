package com.fastcode.example.application.extended.task;

import com.fastcode.example.application.core.task.ITaskMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ITaskMapperExtended extends ITaskMapper {}
