package com.fastcode.example.application.core.authorization.role.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindRoleByIdOutput {

    private String displayName;
    private Long id;
    private String name;
    private Long versiono;
}
