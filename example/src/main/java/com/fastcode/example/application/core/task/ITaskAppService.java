package com.fastcode.example.application.core.task;

import com.fastcode.example.application.core.task.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface ITaskAppService {
    //CRUD Operations
    CreateTaskOutput create(CreateTaskInput task);

    void delete(Long id);

    UpdateTaskOutput update(Long id, UpdateTaskInput input);

    FindTaskByIdOutput findById(Long id);

    List<FindTaskByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations

    GetProjectOutput getProject(Long taskid);

    //Join Column Parsers

    Map<String, String> parseTimesheetdetailsJoinColumn(String keysString);

    Map<String, String> parseUsertasksJoinColumn(String keysString);
}
