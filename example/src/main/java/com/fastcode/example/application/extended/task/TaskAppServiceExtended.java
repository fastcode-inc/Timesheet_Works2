package com.fastcode.example.application.extended.task;

import com.fastcode.example.application.core.task.TaskAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.project.IProjectRepositoryExtended;
import com.fastcode.example.domain.extended.task.ITaskRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("taskAppServiceExtended")
public class TaskAppServiceExtended extends TaskAppService implements ITaskAppServiceExtended {

    public TaskAppServiceExtended(
        ITaskRepositoryExtended taskRepositoryExtended,
        IProjectRepositoryExtended projectRepositoryExtended,
        ITaskMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(taskRepositoryExtended, projectRepositoryExtended, mapper, logHelper);
    }
    //Add your custom code here

}
