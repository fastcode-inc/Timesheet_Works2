package com.fastcode.example.addons.emailbuilder.application.datasource.dto;

public class DataSourceMetaOutput {

    private Long id;

    private String metaColumn;

    private String metaColumnDataType;

    private FindDataSourceOutputForMapping dataSourceEntity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMetaColumn() {
        return metaColumn;
    }

    public void setMetaColumn(String metaColumn) {
        this.metaColumn = metaColumn;
    }

    public String getMetaColumnDataType() {
        return metaColumnDataType;
    }

    public void setMetaColumnDataType(String metaColumnDataType) {
        this.metaColumnDataType = metaColumnDataType;
    }

    public FindDataSourceOutputForMapping getDataSourceEntity() {
        return dataSourceEntity;
    }

    public void setDataSourceEntity(FindDataSourceOutputForMapping dataSourceEntity) {
        this.dataSourceEntity = dataSourceEntity;
    }
}
