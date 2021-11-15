package com.fastcode.example.addons.emailbuilder.domain.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "email")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class EmailTemplateEntity {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(name = "template_name", nullable = false, length = 256)
    private String templateName;

    @Basic
    @Column(name = "category", nullable = true, length = 256)
    private String category;

    @Basic
    @Column(name = "content_html", nullable = true, length = 32768)
    private String contentHtml;

    @Basic
    @Column(name = "content_json", nullable = true, length = 32768)
    private String contentJson;

    @Basic
    @Column(name = "to_", nullable = false, length = 256)
    private String to;

    @Basic
    @Column(name = "cc", nullable = true, length = 256)
    private String cc;

    @Basic
    @Column(name = "bcc", nullable = true, length = 256)
    private String bcc;

    @Basic
    @Column(name = "subject", nullable = true, length = 256)
    private String subject;

    @Basic
    @Column(name = "active", nullable = true)
    private Boolean active;

    @Basic
    @Column(name = "attachmentpath", nullable = true, length = 256)
    private String attachmentpath;

    @Basic
    @Column(name = "description", nullable = true, length = 512)
    private String description;

    public EmailTemplateEntity(Long emailTemplateId) {
        this.id = emailTemplateId;
    }
}
