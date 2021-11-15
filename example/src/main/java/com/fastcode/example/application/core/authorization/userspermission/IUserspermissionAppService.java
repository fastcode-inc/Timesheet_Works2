package com.fastcode.example.application.core.authorization.userspermission;

import com.fastcode.example.application.core.authorization.userspermission.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.domain.core.authorization.userspermission.UserspermissionId;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface IUserspermissionAppService {
    //CRUD Operations
    CreateUserspermissionOutput create(CreateUserspermissionInput userspermission);

    void delete(UserspermissionId userspermissionId);

    UpdateUserspermissionOutput update(UserspermissionId userspermissionId, UpdateUserspermissionInput input);

    FindUserspermissionByIdOutput findById(UserspermissionId userspermissionId);

    List<FindUserspermissionByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations
    //Relationship Operations

    GetPermissionOutput getPermission(UserspermissionId userspermissionId);

    GetUsersOutput getUsers(UserspermissionId userspermissionId);

    //Join Column Parsers

    UserspermissionId parseUserspermissionKey(String keysString);
}
