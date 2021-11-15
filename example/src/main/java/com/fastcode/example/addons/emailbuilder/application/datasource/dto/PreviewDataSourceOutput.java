package com.fastcode.example.addons.emailbuilder.application.datasource.dto;

import java.util.List;

public class PreviewDataSourceOutput {

    private String message;

    private boolean valid;

    private List<DataSourceMetaInput> metaData;

    private List<Object> dataToPreview;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public List<DataSourceMetaInput> getMetaData() {
        return metaData;
    }

    public void setMetaData(List<DataSourceMetaInput> metaData) {
        this.metaData = metaData;
    }

    public List<Object> getDataToPreview() {
        return dataToPreview;
    }

    public void setDataToPreview(List<Object> dataToPreview) {
        this.dataToPreview = dataToPreview;
    }
}
