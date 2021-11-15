package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.customer.ICustomerAppServiceExtended;
import com.fastcode.example.application.extended.project.IProjectAppServiceExtended;
import com.fastcode.example.application.extended.task.ITaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.ProjectController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project/extended")
public class ProjectControllerExtended extends ProjectController {

    public ProjectControllerExtended(
        IProjectAppServiceExtended projectAppServiceExtended,
        ICustomerAppServiceExtended customerAppServiceExtended,
        ITaskAppServiceExtended taskAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(projectAppServiceExtended, customerAppServiceExtended, taskAppServiceExtended, helper, env);
    }
    //Add your custom code here

}
