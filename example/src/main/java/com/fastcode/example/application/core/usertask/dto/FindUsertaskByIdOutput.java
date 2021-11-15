package com.fastcode.example.application.core.usertask.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUsertaskByIdOutput {

    private Long taskid;
    private Long userid;
    private Long taskDescriptiveField;
    private Long usersDescriptiveField;
    private Long versiono;
}
