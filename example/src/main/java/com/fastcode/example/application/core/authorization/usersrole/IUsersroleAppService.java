package com.fastcode.example.application.core.authorization.usersrole;

import com.fastcode.example.application.core.authorization.usersrole.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.domain.core.authorization.usersrole.UsersroleId;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface IUsersroleAppService {
    //CRUD Operations
    CreateUsersroleOutput create(CreateUsersroleInput usersrole);

    void delete(UsersroleId usersroleId);

    UpdateUsersroleOutput update(UsersroleId usersroleId, UpdateUsersroleInput input);

    FindUsersroleByIdOutput findById(UsersroleId usersroleId);

    List<FindUsersroleByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;
    //Relationship Operations
    //Relationship Operations

    GetRoleOutput getRole(UsersroleId usersroleId);

    GetUsersOutput getUsers(UsersroleId usersroleId);

    //Join Column Parsers

    UsersroleId parseUsersroleKey(String keysString);
}
