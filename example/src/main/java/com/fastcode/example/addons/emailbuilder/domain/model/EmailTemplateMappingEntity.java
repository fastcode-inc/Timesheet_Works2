package com.fastcode.example.addons.emailbuilder.domain.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "email_template_mapping_entity")
public class EmailTemplateMappingEntity {

    private Long id;
    private EmailTemplateEntity emailTemplateEntity;
    private EmailVariableEntity mergeField;
    private DataSourceEntity dataSourceEntiry;
    private DataSourceMetaEntity dataSourceMetaEntity;
    private Date creation;

    @PrePersist
    public void setDate() {
        this.creation = new Date();
    }

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
    @JoinColumn(name = "email_template_entity")
    public EmailTemplateEntity getEmailTemplateEntity() {
        return emailTemplateEntity;
    }

    public void setEmailTemplateEntity(EmailTemplateEntity emailTemplateEntity) {
        this.emailTemplateEntity = emailTemplateEntity;
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
    @JoinColumn(name = "data_source_entity")
    public DataSourceEntity getDataSourceEntiry() {
        return dataSourceEntiry;
    }

    public void setDataSourceEntiry(DataSourceEntity dataSourceEntiry) {
        this.dataSourceEntiry = dataSourceEntiry;
    }

    @ManyToOne
    @JoinColumn(name = "data_source_meta_entity")
    public DataSourceMetaEntity getDataSourceMetaEntity() {
        return dataSourceMetaEntity;
    }

    public void setDataSourceMetaEntity(DataSourceMetaEntity dataSourceMetaEntity) {
        this.dataSourceMetaEntity = dataSourceMetaEntity;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }
}
