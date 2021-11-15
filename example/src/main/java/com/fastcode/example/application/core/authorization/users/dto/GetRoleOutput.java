package com.fastcode.example.application.core.authorization.users.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetRoleOutput {

    private Long id;
    private String displayName;
    private String name;
    private Long usersId;
    private String usersDescriptiveField;
}
