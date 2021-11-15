package com.fastcode.example.application.extended.timesheetdetails;

import com.fastcode.example.application.core.timesheetdetails.TimesheetdetailsAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.task.ITaskRepositoryExtended;
import com.fastcode.example.domain.extended.timeofftype.ITimeofftypeRepositoryExtended;
import com.fastcode.example.domain.extended.timesheet.ITimesheetRepositoryExtended;
import com.fastcode.example.domain.extended.timesheetdetails.ITimesheetdetailsRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("timesheetdetailsAppServiceExtended")
public class TimesheetdetailsAppServiceExtended
    extends TimesheetdetailsAppService
    implements ITimesheetdetailsAppServiceExtended {

    public TimesheetdetailsAppServiceExtended(
        ITimesheetdetailsRepositoryExtended timesheetdetailsRepositoryExtended,
        ITaskRepositoryExtended taskRepositoryExtended,
        ITimeofftypeRepositoryExtended timeofftypeRepositoryExtended,
        ITimesheetRepositoryExtended timesheetRepositoryExtended,
        ITimesheetdetailsMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(
            timesheetdetailsRepositoryExtended,
            taskRepositoryExtended,
            timeofftypeRepositoryExtended,
            timesheetRepositoryExtended,
            mapper,
            logHelper
        );
    }
    //Add your custom code here

}
