package com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceMetaOutputForMapping;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.FindEmailVariableByIdOutput;
import java.util.List;

public class FindEmailTemplateMappingDTO {

    private FindEmailVariableByIdOutput mergeField;

    private List<FindDataSourceMetaOutputForMapping> dataSourceMetaList;
}
