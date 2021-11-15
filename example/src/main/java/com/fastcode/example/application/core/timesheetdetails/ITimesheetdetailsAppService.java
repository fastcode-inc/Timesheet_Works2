package com.fastcode.example.application.core.timesheetdetails;

import com.fastcode.example.application.core.timesheetdetails.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface ITimesheetdetailsAppService {
    //CRUD Operations
    CreateTimesheetdetailsOutput create(CreateTimesheetdetailsInput timesheetdetails);

    void delete(Long id);

    UpdateTimesheetdetailsOutput update(Long id, UpdateTimesheetdetailsInput input);

    FindTimesheetdetailsByIdOutput findById(Long id);

    List<FindTimesheetdetailsByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations
    //Relationship Operations
    //Relationship Operations

    GetTaskOutput getTask(Long timesheetdetailsid);

    GetTimeofftypeOutput getTimeofftype(Long timesheetdetailsid);

    GetTimesheetOutput getTimesheet(Long timesheetdetailsid);
    //Join Column Parsers
}
