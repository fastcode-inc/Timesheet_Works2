package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.IMasterEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/master")
public class MasterController {

    @Autowired
    private IMasterEntityService masterEntityService;

    @PreAuthorize("hasAnyAuthority('MASTERENTITY_READ')")
    @GetMapping("/getMastersByMasterName")
    ResponseEntity<String> getMastersByMasterName(@RequestParam(value = "name") String name) throws Exception {
        return new ResponseEntity(masterEntityService.getMastersByMasterName(name), HttpStatus.OK);
    }
}
