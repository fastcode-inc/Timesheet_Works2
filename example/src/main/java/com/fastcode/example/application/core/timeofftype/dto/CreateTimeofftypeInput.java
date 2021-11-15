package com.fastcode.example.application.core.timeofftype.dto;

import java.time.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class CreateTimeofftypeInput {

    @NotNull(message = "typename Should not be null")
    @Length(max = 255, message = "typename must be less than 255 characters")
    private String typename;
}
