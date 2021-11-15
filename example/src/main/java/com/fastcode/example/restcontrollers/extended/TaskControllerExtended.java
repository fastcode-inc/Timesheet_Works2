package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.project.IProjectAppServiceExtended;
import com.fastcode.example.application.extended.task.ITaskAppServiceExtended;
import com.fastcode.example.application.extended.timesheetdetails.ITimesheetdetailsAppServiceExtended;
import com.fastcode.example.application.extended.usertask.IUsertaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.TaskController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task/extended")
public class TaskControllerExtended extends TaskController {

    public TaskControllerExtended(
        ITaskAppServiceExtended taskAppServiceExtended,
        IProjectAppServiceExtended projectAppServiceExtended,
        ITimesheetdetailsAppServiceExtended timesheetdetailsAppServiceExtended,
        IUsertaskAppServiceExtended usertaskAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(
            taskAppServiceExtended,
            projectAppServiceExtended,
            timesheetdetailsAppServiceExtended,
            usertaskAppServiceExtended,
            helper,
            env
        );
    }
    //Add your custom code here

}
