package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableTypeEntity;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IEmailVariableTypeAppService {
    List<EmailVariableTypeEntity> getAllTypes() throws Exception;
}
