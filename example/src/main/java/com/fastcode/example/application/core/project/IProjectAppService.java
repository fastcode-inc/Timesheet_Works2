package com.fastcode.example.application.core.project;

import com.fastcode.example.application.core.project.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface IProjectAppService {
    //CRUD Operations
    CreateProjectOutput create(CreateProjectInput project);

    void delete(Long id);

    UpdateProjectOutput update(Long id, UpdateProjectInput input);

    FindProjectByIdOutput findById(Long id);

    List<FindProjectByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations

    GetCustomerOutput getCustomer(Long projectid);

    //Join Column Parsers

    Map<String, String> parseTasksJoinColumn(String keysString);
}
