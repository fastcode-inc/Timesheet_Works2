package com.fastcode.example.application.core.authorization.role;

import com.fastcode.example.application.core.authorization.role.dto.*;
import com.fastcode.example.domain.core.authorization.role.Role;
import java.time.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IRoleMapper {
    Role createRoleInputToRole(CreateRoleInput roleDto);
    CreateRoleOutput roleToCreateRoleOutput(Role entity);

    Role updateRoleInputToRole(UpdateRoleInput roleDto);

    UpdateRoleOutput roleToUpdateRoleOutput(Role entity);
    FindRoleByIdOutput roleToFindRoleByIdOutput(Role entity);

    FindRoleByNameOutput roleToFindRoleByNameOutput(Role entity);
}
