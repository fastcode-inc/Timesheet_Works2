package com.fastcode.example.application.extended.usertask;

import com.fastcode.example.application.core.usertask.IUsertaskMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IUsertaskMapperExtended extends IUsertaskMapper {}
