package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.authorization.users.IUsersAppServiceExtended;
import com.fastcode.example.application.extended.task.ITaskAppServiceExtended;
import com.fastcode.example.application.extended.usertask.IUsertaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.UsertaskController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usertask/extended")
public class UsertaskControllerExtended extends UsertaskController {

    public UsertaskControllerExtended(
        IUsertaskAppServiceExtended usertaskAppServiceExtended,
        ITaskAppServiceExtended taskAppServiceExtended,
        IUsersAppServiceExtended usersAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(usertaskAppServiceExtended, taskAppServiceExtended, usersAppServiceExtended, helper, env);
    }
    //Add your custom code here

}
