package com.fastcode.example.addons.docmgmt.application.file.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateFileOutput {

    private Long ancestorId;
    private Long ancestralRootId;
    private String contentId;
    private Long contentLength;
    private Date created;
    private Long id;
    private String label;
    private String lockOwner;
    private String mimeType;
    private String name;
    private Long successorId;
    private String summary;
}
