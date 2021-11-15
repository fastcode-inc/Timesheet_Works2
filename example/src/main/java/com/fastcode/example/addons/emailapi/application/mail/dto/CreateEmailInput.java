package com.fastcode.example.addons.emailapi.application.mail.dto;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEmailInput {

    private static final long serialVersionUID = 1L;

    // Not a good idea to validate email addresses because there are too many
    // variations for an email address
    @NotNull(message = "Id: should not be null")
    private Long id;

    @NotNull(message = "To: should not be null")
    private String to;

    private String cc;
    private String bcc;
    private String subject;
    private String emailBody;
    private String contentJson;
    private Set<FileEntity> inlineImages = new HashSet<FileEntity>();
    private Set<FileEntity> attachments = new HashSet<FileEntity>();
}
