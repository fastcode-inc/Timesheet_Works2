package com.fastcode.example.application.extended.timeofftype;

import com.fastcode.example.application.core.timeofftype.TimeofftypeAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.timeofftype.ITimeofftypeRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("timeofftypeAppServiceExtended")
public class TimeofftypeAppServiceExtended extends TimeofftypeAppService implements ITimeofftypeAppServiceExtended {

    public TimeofftypeAppServiceExtended(
        ITimeofftypeRepositoryExtended timeofftypeRepositoryExtended,
        ITimeofftypeMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(timeofftypeRepositoryExtended, mapper, logHelper);
    }
    //Add your custom code here

}
