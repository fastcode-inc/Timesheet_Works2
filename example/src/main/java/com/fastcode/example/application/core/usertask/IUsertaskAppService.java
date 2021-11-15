package com.fastcode.example.application.core.usertask;

import com.fastcode.example.application.core.usertask.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.domain.core.usertask.UsertaskId;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface IUsertaskAppService {
    //CRUD Operations
    CreateUsertaskOutput create(CreateUsertaskInput usertask);

    void delete(UsertaskId usertaskId);

    UpdateUsertaskOutput update(UsertaskId usertaskId, UpdateUsertaskInput input);

    FindUsertaskByIdOutput findById(UsertaskId usertaskId);

    List<FindUsertaskByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations
    //Relationship Operations

    GetTaskOutput getTask(UsertaskId usertaskId);

    GetUsersOutput getUsers(UsertaskId usertaskId);

    //Join Column Parsers

    UsertaskId parseUsertaskKey(String keysString);
}
