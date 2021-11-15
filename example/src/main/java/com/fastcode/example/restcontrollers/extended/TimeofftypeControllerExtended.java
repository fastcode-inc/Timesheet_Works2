package com.fastcode.example.restcontrollers.extended;

import com.fastcode.example.application.extended.timeofftype.ITimeofftypeAppServiceExtended;
import com.fastcode.example.application.extended.timesheetdetails.ITimesheetdetailsAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.restcontrollers.core.TimeofftypeController;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timeofftype/extended")
public class TimeofftypeControllerExtended extends TimeofftypeController {

    public TimeofftypeControllerExtended(
        ITimeofftypeAppServiceExtended timeofftypeAppServiceExtended,
        ITimesheetdetailsAppServiceExtended timesheetdetailsAppServiceExtended,
        LoggingHelper helper,
        Environment env
    ) {
        super(timeofftypeAppServiceExtended, timesheetdetailsAppServiceExtended, helper, env);
    }
    //Add your custom code here

}
