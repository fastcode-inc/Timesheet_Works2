package com.fastcode.example.application.core.customer.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCustomerOutput {

    private Long customerid;
    private String description;
    private Boolean isactive;
    private String name;
}
