package com.fastcode.example.addons.emailbuilder.application.datasource.dto;

import com.fastcode.example.addons.emailbuilder.domain.model.EmailTemplateEntity;
import java.util.Date;
import java.util.List;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class CreateDataSourceInput {

    @NotNull(message = "Name Should not be null")
    @Length(max = 50, message = "Name must be less than 50 characters")
    private String name;

    @NotNull(message = "Property_Type Should not be null")
    private EmailTemplateEntity emailTemplate;

    @Length(max = 256, message = "sqlQuery must be less than 256 characters")
    private String sqlQuery;

    private Date creation;

    List<DataSourceMetaInput> dataSourceMetaList;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public EmailTemplateEntity getEmailTemplate() {
        return emailTemplate;
    }

    public void setEmailTemplate(EmailTemplateEntity emailTemplate) {
        this.emailTemplate = emailTemplate;
    }

    public String getSqlQuery() {
        return sqlQuery;
    }

    public void setSqlQuery(String sqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public List<DataSourceMetaInput> getDataSourceMetaList() {
        return dataSourceMetaList;
    }

    public void setDataSourceMetaList(List<DataSourceMetaInput> dataSourceMetaList) {
        this.dataSourceMetaList = dataSourceMetaList;
    }
}
