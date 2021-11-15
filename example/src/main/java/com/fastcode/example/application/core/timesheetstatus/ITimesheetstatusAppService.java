package com.fastcode.example.application.core.timesheetstatus;

import com.fastcode.example.application.core.timesheetstatus.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface ITimesheetstatusAppService {
    //CRUD Operations
    CreateTimesheetstatusOutput create(CreateTimesheetstatusInput timesheetstatus);

    void delete(Long id);

    UpdateTimesheetstatusOutput update(Long id, UpdateTimesheetstatusInput input);

    FindTimesheetstatusByIdOutput findById(Long id);

    List<FindTimesheetstatusByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;

    //Join Column Parsers

    Map<String, String> parseTimesheetsJoinColumn(String keysString);
}
