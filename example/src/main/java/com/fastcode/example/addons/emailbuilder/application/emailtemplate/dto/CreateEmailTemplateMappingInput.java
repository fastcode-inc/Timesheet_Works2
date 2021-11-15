package com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto;

public class CreateEmailTemplateMappingInput {

    private Long emailTemplateId;

    private Long mergeFieldId;

    private Long dataSourceId;

    private Long dataSourceMetaId;

    public Long getEmailTemplateId() {
        return emailTemplateId;
    }

    public void setEmailTemplateId(Long emailTemplateId) {
        this.emailTemplateId = emailTemplateId;
    }

    public Long getMergeFieldId() {
        return mergeFieldId;
    }

    public void setMergeFieldId(Long mergeFieldId) {
        this.mergeFieldId = mergeFieldId;
    }

    public Long getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(Long dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public Long getDataSourceMetaId() {
        return dataSourceMetaId;
    }

    public void setDataSourceMetaId(Long dataSourceMetaId) {
        this.dataSourceMetaId = dataSourceMetaId;
    }
}
