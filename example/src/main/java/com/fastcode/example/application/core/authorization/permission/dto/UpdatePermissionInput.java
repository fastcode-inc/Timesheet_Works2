package com.fastcode.example.application.core.authorization.permission.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdatePermissionInput {

    @NotNull(message = "displayName Should not be null")
    @Length(max = 255, message = "displayName must be less than 255 characters")
    private String displayName;

    @NotNull(message = "id Should not be null")
    private Long id;

    @NotNull(message = "name Should not be null")
    @Length(max = 255, message = "name must be less than 255 characters")
    private String name;

    private Long versiono;
}
