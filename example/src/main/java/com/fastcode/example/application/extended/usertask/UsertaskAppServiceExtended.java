package com.fastcode.example.application.extended.usertask;

import com.fastcode.example.application.core.usertask.UsertaskAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.task.ITaskRepositoryExtended;
import com.fastcode.example.domain.extended.usertask.IUsertaskRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("usertaskAppServiceExtended")
public class UsertaskAppServiceExtended extends UsertaskAppService implements IUsertaskAppServiceExtended {

    public UsertaskAppServiceExtended(
        IUsertaskRepositoryExtended usertaskRepositoryExtended,
        ITaskRepositoryExtended taskRepositoryExtended,
        IUsersRepositoryExtended usersRepositoryExtended,
        IUsertaskMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(usertaskRepositoryExtended, taskRepositoryExtended, usersRepositoryExtended, mapper, logHelper);
    }
    //Add your custom code here

}
