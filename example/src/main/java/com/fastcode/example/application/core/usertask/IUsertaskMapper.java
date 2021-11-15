package com.fastcode.example.application.core.usertask;

import com.fastcode.example.application.core.usertask.dto.*;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.usertask.Usertask;
import java.time.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface IUsertaskMapper {
    Usertask createUsertaskInputToUsertask(CreateUsertaskInput usertaskDto);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    CreateUsertaskOutput usertaskToCreateUsertaskOutput(Usertask entity);

    Usertask updateUsertaskInputToUsertask(UpdateUsertaskInput usertaskDto);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    UpdateUsertaskOutput usertaskToUpdateUsertaskOutput(Usertask entity);

    @Mappings(
        {
            @Mapping(source = "entity.task.id", target = "taskDescriptiveField"),
            @Mapping(source = "entity.users.id", target = "usersDescriptiveField"),
        }
    )
    FindUsertaskByIdOutput usertaskToFindUsertaskByIdOutput(Usertask entity);

    @Mappings(
        {
            @Mapping(source = "foundUsertask.taskid", target = "usertaskTaskid"),
            @Mapping(source = "foundUsertask.userid", target = "usertaskUserid"),
        }
    )
    GetUsersOutput usersToGetUsersOutput(Users users, Usertask foundUsertask);

    @Mappings(
        {
            @Mapping(source = "foundUsertask.taskid", target = "usertaskTaskid"),
            @Mapping(source = "foundUsertask.userid", target = "usertaskUserid"),
        }
    )
    GetTaskOutput taskToGetTaskOutput(Task task, Usertask foundUsertask);
}
