package com.fastcode.example.addons.emailbuilder.domain.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "email_merge_field")
public class EmailMergeFieldEntity implements Serializable {

    private Long id;

    private EmailVariableEntity mergeField;

    private EmailTemplateEntity emailTemplate;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "merge_field")
    public EmailVariableEntity getMergeField() {
        return mergeField;
    }

    public void setMergeField(EmailVariableEntity mergeField) {
        this.mergeField = mergeField;
    }

    @ManyToOne
    @JoinColumn(name = "email_template")
    public EmailTemplateEntity getEmailTemplate() {
        return emailTemplate;
    }

    public void setEmailTemplate(EmailTemplateEntity emailTemplate) {
        this.emailTemplate = emailTemplate;
    }
}
