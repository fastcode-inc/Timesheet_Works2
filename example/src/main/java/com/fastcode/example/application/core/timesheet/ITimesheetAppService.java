package com.fastcode.example.application.core.timesheet;

import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface ITimesheetAppService {
    //CRUD Operations
    CreateTimesheetOutput create(CreateTimesheetInput timesheet);

    void delete(Long id);

    UpdateTimesheetOutput update(Long id, UpdateTimesheetInput input);

    FindTimesheetByIdOutput findById(Long id);

    List<FindTimesheetByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations
    //Relationship Operations

    GetTimesheetstatusOutput getTimesheetstatus(Long timesheetid);

    GetUsersOutput getUsers(Long timesheetid);

    //Join Column Parsers

    Map<String, String> parseTimesheetdetailsJoinColumn(String keysString);
}
