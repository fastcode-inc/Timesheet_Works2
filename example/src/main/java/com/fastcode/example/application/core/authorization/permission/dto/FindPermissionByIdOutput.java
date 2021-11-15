package com.fastcode.example.application.core.authorization.permission.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPermissionByIdOutput {

    private String displayName;
    private Long id;
    private String name;
    private Long versiono;
}
