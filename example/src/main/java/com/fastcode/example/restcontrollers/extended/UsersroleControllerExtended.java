package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.authorization.role.IRoleAppServiceExtended;
import com.fastcode.example.application.extended.authorization.users.IUsersAppServiceExtended;
import com.fastcode.example.application.extended.authorization.usersrole.IUsersroleAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.UsersroleController;
import com.fastcode.example.security.JWTAppService;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usersrole/extended")
public class UsersroleControllerExtended extends UsersroleController {

    public UsersroleControllerExtended(
        IUsersroleAppServiceExtended usersroleAppServiceExtended,
        IRoleAppServiceExtended roleAppServiceExtended,
        IUsersAppServiceExtended usersAppServiceExtended,
        JWTAppService jwtAppService,
        LoggingHelper helper,
        Environment env
    ) {
        super(usersroleAppServiceExtended, roleAppServiceExtended, usersAppServiceExtended, jwtAppService, helper, env);
    }
    //Add your custom code here

}
