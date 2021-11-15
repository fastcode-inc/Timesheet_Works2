package com.fastcode.example.application.core.authorization.userspermission.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserspermissionInput {

    @NotNull(message = "permissionId Should not be null")
    private Long permissionId;

    private Boolean revoked;

    @NotNull(message = "usersId Should not be null")
    private Long usersId;

    private Long versiono;
}
