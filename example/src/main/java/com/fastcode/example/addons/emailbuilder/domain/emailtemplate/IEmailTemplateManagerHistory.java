package com.fastcode.example.addons.emailbuilder.domain.emailtemplate;

import com.fastcode.example.addons.emailbuilder.domain.model.EmailtemplateEntityHistory;

public interface IEmailTemplateManagerHistory {
    // CRUD Operations
    public EmailtemplateEntityHistory create(EmailtemplateEntityHistory email);

    public void delete(EmailtemplateEntityHistory email);

    public EmailtemplateEntityHistory findById(Long emailId);

    public EmailtemplateEntityHistory findByName(String name);
}
