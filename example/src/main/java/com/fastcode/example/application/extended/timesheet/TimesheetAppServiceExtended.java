package com.fastcode.example.application.extended.timesheet;

import com.fastcode.example.application.core.timesheet.TimesheetAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.timesheet.ITimesheetRepositoryExtended;
import com.fastcode.example.domain.extended.timesheetstatus.ITimesheetstatusRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("timesheetAppServiceExtended")
public class TimesheetAppServiceExtended extends TimesheetAppService implements ITimesheetAppServiceExtended {

    public TimesheetAppServiceExtended(
        ITimesheetRepositoryExtended timesheetRepositoryExtended,
        ITimesheetstatusRepositoryExtended timesheetstatusRepositoryExtended,
        IUsersRepositoryExtended usersRepositoryExtended,
        ITimesheetMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(
            timesheetRepositoryExtended,
            timesheetstatusRepositoryExtended,
            usersRepositoryExtended,
            mapper,
            logHelper
        );
    }
    //Add your custom code here

}
