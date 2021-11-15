package com.fastcode.example.restcontrollers.core;

import com.fastcode.example.application.core.authorization.role.IRoleAppService;
import com.fastcode.example.application.core.authorization.users.IUsersAppService;
import com.fastcode.example.application.core.authorization.users.dto.FindUsersByIdOutput;
import com.fastcode.example.application.core.authorization.usersrole.IUsersroleAppService;
import com.fastcode.example.application.core.authorization.usersrole.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import com.fastcode.example.domain.core.authorization.usersrole.UsersroleId;
import com.fastcode.example.security.JWTAppService;
import java.net.MalformedURLException;
import java.time.*;
import java.util.*;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usersrole")
@RequiredArgsConstructor
public class UsersroleController {

    @Qualifier("usersroleAppService")
    @NonNull
    protected final IUsersroleAppService _usersroleAppService;

    @Qualifier("roleAppService")
    @NonNull
    protected final IRoleAppService _roleAppService;

    @Qualifier("usersAppService")
    @NonNull
    protected final IUsersAppService _usersAppService;

    @NonNull
    protected final JWTAppService _jwtAppService;

    @NonNull
    protected final LoggingHelper logHelper;

    @NonNull
    protected final Environment env;

    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_CREATE')")
    @RequestMapping(method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<CreateUsersroleOutput> create(@RequestBody @Valid CreateUsersroleInput usersrole) {
        CreateUsersroleOutput output = _usersroleAppService.create(usersrole);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        FindUsersByIdOutput foundUsers = _usersAppService.findById(output.getUsersId());
        _jwtAppService.deleteAllUserTokens(foundUsers.getUsername());

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    // ------------ Delete usersrole ------------
    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, consumes = { "application/json" })
    public void delete(@PathVariable String id) {
        UsersroleId usersroleid = _usersroleAppService.parseUsersroleKey(id);
        if (usersroleid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindUsersroleByIdOutput output = _usersroleAppService.findById(usersroleid);
        if (output == null) {
            throw new EntityNotFoundException(String.format("There does not exist a usersrole with a id=%s", id));
        }

        _usersroleAppService.delete(usersroleid);
        FindUsersByIdOutput foundUsers = _usersAppService.findById(output.getUsersId());
        _jwtAppService.deleteAllUserTokens(foundUsers.getUsername());
    }

    // ------------ Update usersrole ------------
    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_UPDATE')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<UpdateUsersroleOutput> update(
        @PathVariable String id,
        @RequestBody @Valid UpdateUsersroleInput usersrole
    ) {
        UsersroleId usersroleid = _usersroleAppService.parseUsersroleKey(id);

        if (usersroleid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindUsersroleByIdOutput currentUsersrole = _usersroleAppService.findById(usersroleid);
        if (currentUsersrole == null) {
            throw new EntityNotFoundException(String.format("Unable to update. Usersrole with id=%s not found.", id));
        }

        usersrole.setVersiono(currentUsersrole.getVersiono());
        FindUsersByIdOutput foundUsers = _usersAppService.findById(usersroleid.getUsersId());
        _jwtAppService.deleteAllUserTokens(foundUsers.getUsername());

        UpdateUsersroleOutput output = _usersroleAppService.update(usersroleid, usersrole);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_READ')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<FindUsersroleByIdOutput> findById(@PathVariable String id) {
        UsersroleId usersroleid = _usersroleAppService.parseUsersroleKey(id);
        if (usersroleid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindUsersroleByIdOutput output = _usersroleAppService.findById(usersroleid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_READ')")
    @RequestMapping(method = RequestMethod.GET, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<List<FindUsersroleByIdOutput>> find(
        @RequestParam(value = "search", required = false) String search,
        @RequestParam(value = "offset", required = false) String offset,
        @RequestParam(value = "limit", required = false) String limit,
        Sort sort
    )
        throws EntityNotFoundException, MalformedURLException {
        if (offset == null) {
            offset = env.getProperty("fastCode.offset.default");
        }
        if (limit == null) {
            limit = env.getProperty("fastCode.limit.default");
        }

        Pageable Pageable = new OffsetBasedPageRequest(Integer.parseInt(offset), Integer.parseInt(limit), sort);
        SearchCriteria searchCriteria = SearchUtils.generateSearchCriteriaObject(search);

        return new ResponseEntity<>(_usersroleAppService.find(searchCriteria, Pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_READ')")
    @RequestMapping(
        value = "/{id}/role",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetRoleOutput> getRole(@PathVariable String id) {
        UsersroleId usersroleid = _usersroleAppService.parseUsersroleKey(id);
        if (usersroleid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        GetRoleOutput output = _usersroleAppService.getRole(usersroleid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('USERSROLEENTITY_READ')")
    @RequestMapping(
        value = "/{id}/users",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetUsersOutput> getUsers(@PathVariable String id) {
        UsersroleId usersroleid = _usersroleAppService.parseUsersroleKey(id);
        if (usersroleid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        GetUsersOutput output = _usersroleAppService.getUsers(usersroleid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }
}
