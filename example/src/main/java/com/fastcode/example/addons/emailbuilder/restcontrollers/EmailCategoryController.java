package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.EmailCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/emailbuilder")
public class EmailCategoryController {

    @Autowired
    private EmailCategoryService emailCategoryService;

    @PreAuthorize("hasAnyAuthority('EMAILCATEGORIES_READ')")
    @GetMapping("/email/categories")
    ResponseEntity<String> getAll() throws Exception {
        return new ResponseEntity(emailCategoryService.getAllCategories(), HttpStatus.OK);
    }
}
