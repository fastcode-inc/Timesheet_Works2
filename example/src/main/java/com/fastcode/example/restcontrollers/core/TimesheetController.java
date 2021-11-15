package com.fastcode.example.restcontrollers.core;

import com.fastcode.example.application.core.authorization.users.IUsersAppService;
import com.fastcode.example.application.core.timesheet.ITimesheetAppService;
import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.application.core.timesheetdetails.ITimesheetdetailsAppService;
import com.fastcode.example.application.core.timesheetdetails.dto.FindTimesheetdetailsByIdOutput;
import com.fastcode.example.application.core.timesheetstatus.ITimesheetstatusAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
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
@RequestMapping("/timesheet")
@RequiredArgsConstructor
public class TimesheetController {

    @Qualifier("timesheetAppService")
    @NonNull
    protected final ITimesheetAppService _timesheetAppService;

    @Qualifier("timesheetdetailsAppService")
    @NonNull
    protected final ITimesheetdetailsAppService _timesheetdetailsAppService;

    @Qualifier("timesheetstatusAppService")
    @NonNull
    protected final ITimesheetstatusAppService _timesheetstatusAppService;

    @Qualifier("usersAppService")
    @NonNull
    protected final IUsersAppService _usersAppService;

    @NonNull
    protected final LoggingHelper logHelper;

    @NonNull
    protected final Environment env;

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_CREATE')")
    @RequestMapping(method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<CreateTimesheetOutput> create(@RequestBody @Valid CreateTimesheetInput timesheet) {
        CreateTimesheetOutput output = _timesheetAppService.create(timesheet);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    // ------------ Delete timesheet ------------
    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, consumes = { "application/json" })
    public void delete(@PathVariable String id) {
        FindTimesheetByIdOutput output = _timesheetAppService.findById(Long.valueOf(id));
        if (output == null) {
            throw new EntityNotFoundException(String.format("There does not exist a timesheet with a id=%s", id));
        }

        _timesheetAppService.delete(Long.valueOf(id));
    }

    // ------------ Update timesheet ------------
    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_UPDATE')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<UpdateTimesheetOutput> update(
        @PathVariable String id,
        @RequestBody @Valid UpdateTimesheetInput timesheet
    ) {
        FindTimesheetByIdOutput currentTimesheet = _timesheetAppService.findById(Long.valueOf(id));
        if (currentTimesheet == null) {
            throw new EntityNotFoundException(String.format("Unable to update. Timesheet with id=%s not found.", id));
        }

        timesheet.setVersiono(currentTimesheet.getVersiono());
        UpdateTimesheetOutput output = _timesheetAppService.update(Long.valueOf(id), timesheet);
        if (output == null) {
            throw new EntityNotFoundException("No record found");
        }
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_READ')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<FindTimesheetByIdOutput> findById(@PathVariable String id) {
        FindTimesheetByIdOutput output = _timesheetAppService.findById(Long.valueOf(id));
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_READ')")
    @RequestMapping(method = RequestMethod.GET, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<List<FindTimesheetByIdOutput>> find(
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

        return new ResponseEntity<>(_timesheetAppService.find(searchCriteria, Pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_READ')")
    @RequestMapping(
        value = "/{id}/timesheetdetails",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<List<FindTimesheetdetailsByIdOutput>> getTimesheetdetails(
        @PathVariable String id,
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

        Pageable pageable = new OffsetBasedPageRequest(Integer.parseInt(offset), Integer.parseInt(limit), sort);

        SearchCriteria searchCriteria = SearchUtils.generateSearchCriteriaObject(search);
        Map<String, String> joinColDetails = _timesheetAppService.parseTimesheetdetailsJoinColumn(id);
        if (joinColDetails == null) {
            throw new EntityNotFoundException("Invalid join column");
        }

        searchCriteria.setJoinColumns(joinColDetails);

        List<FindTimesheetdetailsByIdOutput> output = _timesheetdetailsAppService.find(searchCriteria, pageable);

        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_READ')")
    @RequestMapping(
        value = "/{id}/timesheetstatus",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetTimesheetstatusOutput> getTimesheetstatus(@PathVariable String id) {
        GetTimesheetstatusOutput output = _timesheetAppService.getTimesheetstatus(Long.valueOf(id));
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('TIMESHEETENTITY_READ')")
    @RequestMapping(
        value = "/{id}/users",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<GetUsersOutput> getUsers(@PathVariable String id) {
        GetUsersOutput output = _timesheetAppService.getUsers(Long.valueOf(id));
        if (output == null) {
            throw new EntityNotFoundException("Not found");
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }
}
