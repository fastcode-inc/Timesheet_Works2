package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.util.List;
import javax.validation.constraints.Positive;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IEmailVariableAppService {
    CreateEmailVariableOutput create(CreateEmailVariableInput email);

    void delete(@Positive(message = "EmailId should be a positive value") Long eid);

    UpdateEmailVariableOutput update(
        @Positive(message = "EmailId should be a positive value") Long eid,
        UpdateEmailVariableInput email
    );

    FindEmailVariableByIdOutput findById(@Positive(message = "EmailId should be a positive value") Long eid);

    FindEmailVariableByNameOutput findByName(String name);

    List<FindEmailVariableByIdOutput> find(SearchCriteria search, Pageable pageable) throws Exception;
}
