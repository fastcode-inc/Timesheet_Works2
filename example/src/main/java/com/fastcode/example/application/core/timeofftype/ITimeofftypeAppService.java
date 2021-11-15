package com.fastcode.example.application.core.timeofftype;

import com.fastcode.example.application.core.timeofftype.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface ITimeofftypeAppService {
    //CRUD Operations
    CreateTimeofftypeOutput create(CreateTimeofftypeInput timeofftype);

    void delete(Long id);

    UpdateTimeofftypeOutput update(Long id, UpdateTimeofftypeInput input);

    FindTimeofftypeByIdOutput findById(Long id);

    List<FindTimeofftypeByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;

    //Join Column Parsers

    Map<String, String> parseTimesheetdetailsJoinColumn(String keysString);
}
