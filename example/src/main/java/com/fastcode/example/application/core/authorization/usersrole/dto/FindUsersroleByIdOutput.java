package com.fastcode.example.application.core.authorization.usersrole.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUsersroleByIdOutput {

    private Long roleId;
    private Long usersId;
    private String roleDescriptiveField;
    private Long usersDescriptiveField;
    private Long versiono;
}
