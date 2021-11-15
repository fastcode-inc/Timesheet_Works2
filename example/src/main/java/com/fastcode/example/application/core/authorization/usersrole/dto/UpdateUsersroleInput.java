package com.fastcode.example.application.core.authorization.usersrole.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUsersroleInput {

    @NotNull(message = "roleId Should not be null")
    private Long roleId;

    @NotNull(message = "usersId Should not be null")
    private Long usersId;

    private Long versiono;
}
