package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.DataSourceMetaOutput;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceMetaEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableEntity;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IEmailVariableMapper {
    EmailVariableEntity createEmailVariableInputToEmailVariableEntity(CreateEmailVariableInput emailDto);

    CreateEmailVariableOutput emailVariableEntityToCreateEmailVariableOutput(EmailVariableEntity entity);

    EmailVariableEntity updateEmailVariableInputToEmailVariableEntity(UpdateEmailVariableInput emailDto);

    UpdateEmailVariableOutput emailVariableEntityToUpdateEmailVariableOutput(EmailVariableEntity entity);

    FindEmailVariableByIdOutput emailVariableEntityToFindEmailVariableByIdOutput(EmailVariableEntity entity);

    FindEmailVariableByNameOutput emailVariableEntityToFindEmailVariableByNameOutput(EmailVariableEntity entity);

    List<DataSourceMetaOutput> dataSourceEntityToDataSourceMetaList(List<DataSourceMetaEntity> list);
}
