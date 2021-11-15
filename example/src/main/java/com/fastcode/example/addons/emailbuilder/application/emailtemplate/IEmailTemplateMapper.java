package com.fastcode.example.addons.emailbuilder.application.emailtemplate;

import com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto.*;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailTemplateEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailtemplateEntityHistory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IEmailTemplateMapper {
    EmailTemplateEntity createEmailTemplateInputToEmailTemplateEntity(CreateEmailTemplateInput emailDto);

    CreateEmailTemplateOutput emailTemplateEntityToCreateEmailTemplateOutput(EmailTemplateEntity entity);

    EmailTemplateEntity updateEmailTemplateInputToEmailTemplateEntity(UpdateEmailTemplateInput emailDto);

    UpdateEmailTemplateOutput emailTemplateEntityToUpdateEmailTemplateOutput(EmailTemplateEntity entity);

    FindEmailTemplateByIdOutput emailTemplateEntityToFindEmailTemplateByIdOutput(EmailTemplateEntity entity);

    FindEmailTemplateByNameOutput emailTemplateEntityToFindEmailTemplateByNameOutput(EmailTemplateEntity entity);

    FindEmailTemplateByIdOutput emailTemplateEntityToFindEmailTemplateByIdOutputforReset(
        EmailtemplateEntityHistory foundEmail
    );

    EmailtemplateEntityHistory createEmailTemplateInputToEmailTemplateEntityforReset(CreateEmailTemplateInput email);
}
