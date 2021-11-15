package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.EmailVariableAppService;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import java.util.Optional;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/emailvariable")
public class EmailVariableController {

    @Autowired
    private EmailVariableAppService emailVariableAppService;

    @Autowired
    private LoggingHelper logHelper;

    @Autowired
    private Environment env;

    @PreAuthorize("hasAnyAuthority('EMAILVARIABLEENTITY_READ')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CreateEmailVariableOutput> create(@RequestBody @Valid CreateEmailVariableInput email) {
        FindEmailVariableByNameOutput foundEmail = emailVariableAppService.findByName(email.getPropertyName());
        if (foundEmail != null) {
            logHelper.getLogger().error("There already exists a email with a name=%s", email.getPropertyName());
            throw new EntityExistsException(
                String.format("There already exists a user with email address=%s", email.getPropertyName())
            );
        }
        return new ResponseEntity(emailVariableAppService.create(email), HttpStatus.OK);
    }

    // ------------ Delete an email ------------
    @PreAuthorize("hasAnyAuthority('EMAILVARIABLEENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        FindEmailVariableByIdOutput currentEmail = emailVariableAppService.findById(Long.valueOf(id));
        Optional
            .ofNullable(currentEmail)
            .orElseThrow(
                () -> new EntityNotFoundException(String.format("There does not exist a email wth a id=%s", id))
            );

        emailVariableAppService.delete(Long.valueOf(id));
    }

    // ------------ Update an email ------------

    @PreAuthorize("hasAnyAuthority('EMAILVARIABLEENTITY_UPDATE')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UpdateEmailVariableOutput> update(
        @PathVariable String id,
        @RequestBody @Valid UpdateEmailVariableInput email
    ) {
        FindEmailVariableByIdOutput currentEmail = emailVariableAppService.findById(Long.valueOf(id));

        Optional
            .ofNullable(currentEmail)
            .orElseThrow(
                () -> new EntityNotFoundException(String.format("Unable to update. Email with id=%s not found.", id))
            );
        //    email.setVersiono(currentEmail.getVersiono());

        return new ResponseEntity(emailVariableAppService.update(Long.valueOf(id), email), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('EMAILVARIABLEENTITY_READ')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<FindEmailVariableByIdOutput> findById(@PathVariable String id) {
        FindEmailVariableByIdOutput currentEmail = emailVariableAppService.findById(Long.valueOf(id));

        Optional.ofNullable(currentEmail).orElseThrow(() -> new EntityNotFoundException(String.format("Not found")));
        return new ResponseEntity(currentEmail, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('EMAILVARIABLEENTITY_READ')")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity find(
        @RequestParam(value = "search", required = false) String search,
        @RequestParam(value = "offset", required = false) String offset,
        @RequestParam(value = "limit", required = false) String limit,
        Sort sort
    )
        throws Exception {
        if (offset == null) {
            offset = env.getProperty("fastCode.offset.default");
        }
        if (limit == null) {
            limit = env.getProperty("fastCode.limit.default");
        }
        //if (sort.isUnsorted()) { sort = new Sort(Sort.Direction.fromString(env.getProperty("fastCode.sort.direction.default")), new String[]{env.getProperty("fastCode.sort.property.default")}); }

        Pageable Pageable = new OffsetBasedPageRequest(Integer.parseInt(offset), Integer.parseInt(limit), sort);
        SearchCriteria searchCriteria = SearchUtils.generateSearchCriteriaObject(search);

        return ResponseEntity.ok(emailVariableAppService.find(searchCriteria, Pageable));
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity list() throws Exception {
        return ResponseEntity.ok(emailVariableAppService.findAll());
    }

    @RequestMapping(value = "/getEmailVariableByTypeOrSubject", method = RequestMethod.GET)
    public ResponseEntity getEmailVariableByType(@RequestParam(value = "type", required = false) String type)
        throws Exception {
        return ResponseEntity.ok(emailVariableAppService.getEmailVariableByTypeOrSubject(type));
    }
}
