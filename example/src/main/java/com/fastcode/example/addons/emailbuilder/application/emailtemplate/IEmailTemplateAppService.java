package com.fastcode.example.addons.emailbuilder.application.emailtemplate;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceMetaOutputForMapping;
import com.fastcode.example.addons.emailbuilder.application.emailtemplate.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.util.List;
import javax.validation.constraints.Positive;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IEmailTemplateAppService {
    CreateEmailTemplateOutput create(CreateEmailTemplateInput email);

    void delete(@Positive(message = "EmailId should be a positive value") Long eid);

    UpdateEmailTemplateOutput update(
        @Positive(message = "EmailId should be a positive value") Long eid,
        UpdateEmailTemplateInput email
    );

    FindEmailTemplateByIdOutput findById(@Positive(message = "EmailId should be a positive value") Long eid);

    FindEmailTemplateByNameOutput findByName(String name);

    List<FindEmailTemplateByIdOutput> find(SearchCriteria search, Pageable pageable) throws Exception;

    List<FindDataSourceMetaOutputForMapping> getMappingForEmail(Long emailTemplateId);

    List<CreateEmailTemplateMappingInput> createMapping(List<CreateEmailTemplateMappingInput> mapping);
}
