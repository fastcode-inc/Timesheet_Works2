package com.fastcode.example.application.core.timesheet.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUsersOutput {

    private String emailaddress;
    private String firstname;
    private Long id;
    private Boolean isactive;
    private Boolean isemailconfirmed;
    private LocalDate joinDate;
    private String lastname;
    private String password;
    private String username;
    private Long timesheetId;
}
