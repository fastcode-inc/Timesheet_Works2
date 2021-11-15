package com.fastcode.example.application.core.timeofftype.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindTimeofftypeByIdOutput {

    private Long id;
    private String typename;
    private Long versiono;
}
