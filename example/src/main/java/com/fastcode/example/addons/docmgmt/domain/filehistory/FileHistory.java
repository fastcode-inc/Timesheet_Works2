package com.fastcode.example.addons.docmgmt.domain.filehistory;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;

@Entity
@Table(name = "file_history")
public class FileHistory implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private Date created = new Date();

    @Column(nullable = true)
    private String summary;

    @Column(name = "content_id", nullable = true)
    @ContentId
    private String contentId;

    @Column(name = "content_length", nullable = true)
    @ContentLength
    private long contentLength;

    @Column(name = "mime_type", nullable = true)
    @MimeType
    private String mimeType;

    @Column(name = "email_template_id", nullable = true)
    private Long emailTemplateId;

    // Copy Constructor
    public FileHistory(FileHistory file) {
        this.name = file.getName();
        this.summary = file.getSummary();
    }

    public FileHistory() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContentId() {
        return contentId;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    public long getContentLength() {
        return contentLength;
    }

    public void setContentLength(long contentLength) {
        this.contentLength = contentLength;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Long getEmailTemplateId() {
        return emailTemplateId;
    }

    public void setEmailTemplateId(Long emailTemplateId) {
        this.emailTemplateId = emailTemplateId;
    }
}
