package com.fastcode.example.addons.emailbuilder.application.datasource;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.CreateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.CreateDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.DataSourceMetaInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceByIdOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceByNameOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceMetaEntity;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DataSourceMapper {
    DataSourceEntity createDataSourceInputToDataSourceEntity(CreateDataSourceInput emailDto);

    CreateDataSourceOutput dataSourceEntityToCreateDataSourceOutput(DataSourceEntity entity);

    DataSourceEntity updateDataSourceInputToDataSourceEntity(UpdateDataSourceInput emailDto);

    UpdateDataSourceOutput dataSourceEntityToUpdateDataSourceOutput(DataSourceEntity entity);

    FindDataSourceByIdOutput dataSourceEntityToFindDataSourceByIdOutput(DataSourceEntity entity);

    FindDataSourceByNameOutput dataSourceEntityToFindDataSourceByNameOutput(DataSourceEntity entity);

    List<DataSourceMetaInput> dataSourceMetaEntityToDataSourceMetaInput(List<DataSourceMetaEntity> entities);
}
