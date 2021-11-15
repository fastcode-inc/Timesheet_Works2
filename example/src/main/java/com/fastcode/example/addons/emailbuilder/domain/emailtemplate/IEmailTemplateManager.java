package com.fastcode.example.addons.emailbuilder.domain.emailtemplate;

import com.fastcode.example.addons.emailbuilder.domain.model.EmailTemplateEntity;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IEmailTemplateManager {
    // CRUD Operations
    public EmailTemplateEntity create(EmailTemplateEntity email);

    public void delete(EmailTemplateEntity email);

    public EmailTemplateEntity update(EmailTemplateEntity email);

    public EmailTemplateEntity findById(Long emailId);

    public EmailTemplateEntity findByName(String name);

    public Page<EmailTemplateEntity> findAll(Predicate predicate, Pageable pageable);

    public List<EmailTemplateEntity> findAll();
}
