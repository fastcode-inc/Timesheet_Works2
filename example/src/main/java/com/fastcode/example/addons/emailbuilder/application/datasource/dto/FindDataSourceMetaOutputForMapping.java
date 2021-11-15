package com.fastcode.example.addons.emailbuilder.application.datasource.dto;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.FindEmailVariableByIdOutput;
import java.util.List;

public class FindDataSourceMetaOutputForMapping {

    private int totalMergeField;

    private int mappedMergeField;

    private FindEmailVariableByIdOutput mergeField;

    private List<DataSourceMetaOutput> dataSourceMetaList;

    private List<DataSourceMetaOutput> alreadyMappedList;

    public int getTotalMergeField() {
        return totalMergeField;
    }

    public void setTotalMergeField(int totalMergeField) {
        this.totalMergeField = totalMergeField;
    }

    public int getMappedMergeField() {
        return mappedMergeField;
    }

    public void setMappedMergeField(int mappedMergeField) {
        this.mappedMergeField = mappedMergeField;
    }

    public FindEmailVariableByIdOutput getMergeField() {
        return mergeField;
    }

    public void setMergeField(FindEmailVariableByIdOutput mergeField) {
        this.mergeField = mergeField;
    }

    public List<DataSourceMetaOutput> getDataSourceMetaList() {
        return dataSourceMetaList;
    }

    public void setDataSourceMetaList(List<DataSourceMetaOutput> dataSourceMetaList) {
        this.dataSourceMetaList = dataSourceMetaList;
    }

    public List<DataSourceMetaOutput> getAlreadyMappedList() {
        return alreadyMappedList;
    }

    public void setAlreadyMappedList(List<DataSourceMetaOutput> alreadyMappedList) {
        this.alreadyMappedList = alreadyMappedList;
    }
}
