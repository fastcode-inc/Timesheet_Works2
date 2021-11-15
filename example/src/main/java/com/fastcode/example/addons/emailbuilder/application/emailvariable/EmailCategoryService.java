package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailTemplateRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class EmailCategoryService implements IEmailCategoryService {

    @Autowired
    IEmailTemplateRepository emailTemplateRepository;

    @Override
    public List<String> getAllCategories() throws Exception {
        return emailTemplateRepository.findAllDistinctCategories();
    }
}
