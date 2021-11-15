package com.fastcode.example.restcontrollers.core;

import com.fastcode.example.application.core.authorization.permission.IPermissionAppService;
import com.fastcode.example.application.core.authorization.role.IRoleAppService;
import com.fastcode.example.application.core.authorization.rolepermission.IRolepermissionAppService;
import com.fastcode.example.application.core.authorization.rolepermission.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import com.fastcode.example.domain.core.authorization.rolepermission.RolepermissionId;
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
@RequestMapping("/rolepermission")
@RequiredArgsConstructor
public class RolepermissionController {

    @Qualifier("rolepermissionAppService")
    @NonNull
    protected final IRolepermissionAppService _rolepermissionAppService;

    @Qualifier("permissionAppService")
    @NonNull
    protected final IPermissionAppService _permissionAppService;

    @Qualifier("roleAppService")
    @NonNull
    protected final IRoleAppService _roleAppService;

    @NonNull
    protected final LoggingHelper logHelper;

    @NonNull
    protected final Environment env;

    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_CREATE')")
    @RequestMapping(method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<CreateRolepermissionOutput> create(
        @RequestBody @Valid CreateRolepermissionInput rolepermission
    ) {
        CreateRolepermissionOutput output = _rolepermissionAppService.create(rolepermission);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        _rolepermissionAppService.deleteUserTokens(output.getRoleId());

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    // ------------ Delete rolepermission ------------
    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, consumes = { "application/json" })
    public void delete(@PathVariable String id) {
        RolepermissionId rolepermissionid = _rolepermissionAppService.parseRolepermissionKey(id);
        if (rolepermissionid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindRolepermissionByIdOutput output = _rolepermissionAppService.findById(rolepermissionid);
        if (output == null) {
            throw new EntityNotFoundException(String.format("There does not exist a rolepermission with a id=%s", id));
        }

        _rolepermissionAppService.delete(rolepermissionid);

        _rolepermissionAppService.deleteUserTokens(output.getRoleId());
    }

    // ------------ Update rolepermission ------------
    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_UPDATE')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<UpdateRolepermissionOutput> update(
        @PathVariable String id,
        @RequestBody @Valid UpdateRolepermissionInput rolepermission
    ) {
        RolepermissionId rolepermissionid = _rolepermissionAppService.parseRolepermissionKey(id);

        if (rolepermissionid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindRolepermissionByIdOutput currentRolepermission = _rolepermissionAppService.findById(rolepermissionid);
        if (currentRolepermission == null) {
            throw new EntityNotFoundException(
                String.format("Unable to update. Rolepermission with id=%s not found.", id)
            );
        }

        rolepermission.setVersiono(currentRolepermission.getVersiono());
        _rolepermissionAppService.deleteUserTokens(rolepermissionid.getRoleId());
        UpdateRolepermissionOutput output = _rolepermissionAppService.update(rolepermissionid, rolepermission);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_READ')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<FindRolepermissionByIdOutput> findById(@PathVariable String id) {
        RolepermissionId rolepermissionid = _rolepermissionAppService.parseRolepermissionKey(id);
        if (rolepermissionid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        FindRolepermissionByIdOutput output = _rolepermissionAppService.findById(rolepermissionid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_READ')")
    @RequestMapping(method = RequestMethod.GET, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<List<FindRolepermissionByIdOutput>> find(
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

        return new ResponseEntity<>(_rolepermissionAppService.find(searchCriteria, Pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_READ')")
    @RequestMapping(
        value = "/{id}/permission",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetPermissionOutput> getPermission(@PathVariable String id) {
        RolepermissionId rolepermissionid = _rolepermissionAppService.parseRolepermissionKey(id);
        if (rolepermissionid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        GetPermissionOutput output = _rolepermissionAppService.getPermission(rolepermissionid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLEPERMISSIONENTITY_READ')")
    @RequestMapping(
        value = "/{id}/role",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetRoleOutput> getRole(@PathVariable String id) {
        RolepermissionId rolepermissionid = _rolepermissionAppService.parseRolepermissionKey(id);
        if (rolepermissionid == null) {
            throw new EntityNotFoundException(String.format("Invalid id=%s", id));
        }

        GetRoleOutput output = _rolepermissionAppService.getRole(rolepermissionid);
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }
}
