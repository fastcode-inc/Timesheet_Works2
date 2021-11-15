package com.fastcode.example.addons.emailbuilder.application.emailvariable.dto;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdateEmailVariableInput {

    @NotNull(message = "Id Should not be null")
    private Long id;

    @NotNull(message = "Property_Name Should not be null")
    @Length(max = 50, message = "Property_Name must be less than 50 characters")
    private String propertyName;

    @NotNull(message = "Property_Type Should not be null")
    @Length(max = 50, message = "Property_Type must be less than 50 characters")
    private String propertyType;

    @Length(max = 100, message = "Default_Value must be less than 100 characters")
    private String defaultValue;

    //   private Long versiono;
    private String mergeType;
}
