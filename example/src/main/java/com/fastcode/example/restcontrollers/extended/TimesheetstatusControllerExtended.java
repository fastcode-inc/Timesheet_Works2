package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.timesheet.ITimesheetAppServiceExtended;
import com.fastcode.example.application.extended.timesheetstatus.ITimesheetstatusAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.TimesheetstatusController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timesheetstatus/extended")
public class TimesheetstatusControllerExtended extends TimesheetstatusController {

    public TimesheetstatusControllerExtended(
        ITimesheetstatusAppServiceExtended timesheetstatusAppServiceExtended,
        ITimesheetAppServiceExtended timesheetAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(timesheetstatusAppServiceExtended, timesheetAppServiceExtended, helper, env);
    }
    //Add your custom code here

}
