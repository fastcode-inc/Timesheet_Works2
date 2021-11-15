package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.task.ITaskAppServiceExtended;
import com.fastcode.example.application.extended.timeofftype.ITimeofftypeAppServiceExtended;
import com.fastcode.example.application.extended.timesheet.ITimesheetAppServiceExtended;
import com.fastcode.example.application.extended.timesheetdetails.ITimesheetdetailsAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.TimesheetdetailsController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timesheetdetails/extended")
public class TimesheetdetailsControllerExtended extends TimesheetdetailsController {

    public TimesheetdetailsControllerExtended(
        ITimesheetdetailsAppServiceExtended timesheetdetailsAppServiceExtended,
        ITaskAppServiceExtended taskAppServiceExtended,
        ITimeofftypeAppServiceExtended timeofftypeAppServiceExtended,
        ITimesheetAppServiceExtended timesheetAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(
            timesheetdetailsAppServiceExtended,
            taskAppServiceExtended,
            timeofftypeAppServiceExtended,
            timesheetAppServiceExtended,
            helper,
            env
        );
    }
    //Add your custom code here

}
