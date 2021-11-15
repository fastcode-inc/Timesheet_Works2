package com.fastcode.example.addons.emailbuilder.domain.model;

import java.io.Serializable;

public class EmailfileId implements Serializable {

    private Long fileId;
    private Long emailId;

    public EmailfileId() {}

    public EmailfileId(Long fileId, Long emailId) {
        this.fileId = fileId;
        this.emailId = emailId;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public Long getEmailId() {
        return emailId;
    }

    public void setEmailId(Long emailId) {
        this.emailId = emailId;
    }
}
