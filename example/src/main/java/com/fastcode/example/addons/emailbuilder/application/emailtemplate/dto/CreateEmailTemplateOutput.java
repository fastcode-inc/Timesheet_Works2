package com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEmailTemplateOutput {

    private Long id;
    private String templateName;
    private String category;
    private String contentHtml;
    private String contentJson;
    private String to;
    private String cc;
    private String bcc;
    private String subject;
    private Boolean active;
    private String attachmentpath;
    private String description;
    List<FileEntity> inlineImages;
    List<FileEntity> attachments;
}
