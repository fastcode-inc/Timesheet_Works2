package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.IEmailVariableTypeAppService;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableTypeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/emailvariabletypes")
public class EmailVariableTypeController {

    @Autowired
    IEmailVariableTypeAppService emailVariableTypeAppService;

    @PreAuthorize("hasAnyAuthority('EMAILVARIABLETYPES_READ')")
    @GetMapping("/variable-types")
    ResponseEntity<EmailVariableTypeEntity> getAll() throws Exception {
        return new ResponseEntity(emailVariableTypeAppService.getAllTypes(), HttpStatus.OK);
    }
}
