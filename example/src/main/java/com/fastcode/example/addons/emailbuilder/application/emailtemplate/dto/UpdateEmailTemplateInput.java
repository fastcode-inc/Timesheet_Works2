package com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdateEmailTemplateInput {

    private Long id;

    @NotNull(message = "Template_Name Should not be null")
    @Length(max = 256, message = "Template_Name must be less than 256 characters")
    private String templateName;

    @Length(max = 256, message = "Email_Category must be less than 256 characters")
    private String category;

    @Length(max = 4096, message = "Content_Html must be less than 32768 characters")
    private String contentHtml;

    @Length(max = 4096, message = "Content_Json must be less than 32768 characters")
    private String contentJson;

    @NotNull(message = "To Should not be null")
    @Length(max = 256, message = "To must be less than 256 characters")
    private String to;

    @Length(max = 256, message = "CC must be less than 256 characters")
    private String cc;

    @Length(max = 256, message = "Bcc must be less than 256 characters")
    private String bcc;

    @Length(max = 256, message = "Subject must be less than 256 characters")
    private String subject;

    private Boolean active;
    private String attachmentpath;

    // private Long versiono;

    @Length(max = 512, message = "Description Name must be less than 512 characters")
    private String description;

    List<FileEntity> inlineImages;
    List<FileEntity> attachments;
}
