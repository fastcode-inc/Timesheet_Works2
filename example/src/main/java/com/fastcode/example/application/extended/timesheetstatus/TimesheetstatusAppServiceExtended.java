package com.fastcode.example.application.extended.timesheetstatus;

import com.fastcode.example.application.core.timesheetstatus.TimesheetstatusAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.timesheetstatus.ITimesheetstatusRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("timesheetstatusAppServiceExtended")
public class TimesheetstatusAppServiceExtended
    extends TimesheetstatusAppService
    implements ITimesheetstatusAppServiceExtended {

    public TimesheetstatusAppServiceExtended(
        ITimesheetstatusRepositoryExtended timesheetstatusRepositoryExtended,
        ITimesheetstatusMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(timesheetstatusRepositoryExtended, mapper, logHelper);
    }
    //Add your custom code here

}
