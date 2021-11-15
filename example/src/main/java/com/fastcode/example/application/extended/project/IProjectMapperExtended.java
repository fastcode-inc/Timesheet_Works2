package com.fastcode.example.application.extended.project;

import com.fastcode.example.application.core.project.IProjectMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IProjectMapperExtended extends IProjectMapper {}
