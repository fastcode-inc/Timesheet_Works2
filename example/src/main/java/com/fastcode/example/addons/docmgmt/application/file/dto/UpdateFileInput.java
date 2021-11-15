package com.fastcode.example.addons.docmgmt.application.file.dto;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateFileInput {

    @NotNull(message = "id Should not be null")
    private Long id;

    private String label;

    private String name;

    private String summary;
}
