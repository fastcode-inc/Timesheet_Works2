package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.authorization.users.IUsersAppServiceExtended;
import com.fastcode.example.application.extended.authorization.userspermission.IUserspermissionAppServiceExtended;
import com.fastcode.example.application.extended.authorization.usersrole.IUsersroleAppServiceExtended;
import com.fastcode.example.application.extended.timesheet.ITimesheetAppServiceExtended;
import com.fastcode.example.application.extended.usertask.IUsertaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.UsersController;
import com.fastcode.example.security.JWTAppService;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/extended")
public class UsersControllerExtended extends UsersController {

    public UsersControllerExtended(
        IUsersAppServiceExtended usersAppServiceExtended,
        ITimesheetAppServiceExtended timesheetAppServiceExtended,
        IUserspermissionAppServiceExtended userspermissionAppServiceExtended,
        IUsersroleAppServiceExtended usersroleAppServiceExtended,
        IUsertaskAppServiceExtended usertaskAppServiceExtended,
        PasswordEncoder pEncoder,
        JWTAppService jwtAppService,
        LoggingHelper helper,
        Environment env
    ) {
        super(
            usersAppServiceExtended,
            timesheetAppServiceExtended,
            userspermissionAppServiceExtended,
            usersroleAppServiceExtended,
            usertaskAppServiceExtended,
            pEncoder,
            jwtAppService,
            helper,
            env
        );
    }
    //Add your custom code here

}
