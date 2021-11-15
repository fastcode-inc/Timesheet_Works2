package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.emailtemplate.EmailTemplateAppService;
import com.fastcode.example.commons.domain.EmptyJsonResponse;
import java.io.IOException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/htmlEmail")
public class HtmlEmailController {

    @Autowired
    private EmailTemplateAppService emailTemplateAppService;

    @PreAuthorize("hasAnyAuthority('JSON_TO_HTML')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> jsonToHtml(@RequestBody @Valid String json) throws IOException {
        if (json != null) return new ResponseEntity(
            emailTemplateAppService.convertJsonToHtml(json),
            HttpStatus.OK
        ); else return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.NOT_FOUND);
    }
}
