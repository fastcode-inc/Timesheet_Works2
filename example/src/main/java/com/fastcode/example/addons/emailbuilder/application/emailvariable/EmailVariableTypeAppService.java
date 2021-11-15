package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailVariableTypeRepository;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableTypeEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class EmailVariableTypeAppService implements IEmailVariableTypeAppService {

    @Autowired
    IEmailVariableTypeRepository emailVariableTypeRepository;

    @Override
    public List<EmailVariableTypeEntity> getAllTypes() throws Exception {
        return emailVariableTypeRepository.findAll();
    }
}
