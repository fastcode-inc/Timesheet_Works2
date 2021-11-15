package com.fastcode.example.application.core.authorization.role;

import com.fastcode.example.application.core.authorization.role.dto.*;
import com.fastcode.example.commons.search.SearchCriteria;
import java.net.MalformedURLException;
import java.util.*;
import org.springframework.data.domain.Pageable;

public interface IRoleAppService {
    //CRUD Operations
    CreateRoleOutput create(CreateRoleInput role);

    void delete(Long id);

    UpdateRoleOutput update(Long id, UpdateRoleInput input);

    FindRoleByIdOutput findById(Long id);

    List<FindRoleByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException;

    FindRoleByNameOutput findByRoleName(String roleName);

    //Join Column Parsers

    Map<String, String> parseRolepermissionsJoinColumn(String keysString);

    Map<String, String> parseUsersrolesJoinColumn(String keysString);
}
