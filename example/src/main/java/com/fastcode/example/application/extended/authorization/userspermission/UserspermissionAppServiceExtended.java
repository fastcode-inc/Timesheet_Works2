package com.fastcode.example.application.extended.authorization.userspermission;

import com.fastcode.example.application.core.authorization.userspermission.UserspermissionAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.authorization.permission.IPermissionRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.userspermission.IUserspermissionRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("userspermissionAppServiceExtended")
public class UserspermissionAppServiceExtended
    extends UserspermissionAppService
    implements IUserspermissionAppServiceExtended {

    public UserspermissionAppServiceExtended(
        IUserspermissionRepositoryExtended userspermissionRepositoryExtended,
        IPermissionRepositoryExtended permissionRepositoryExtended,
        IUsersRepositoryExtended usersRepositoryExtended,
        IUserspermissionMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(
            userspermissionRepositoryExtended,
            permissionRepositoryExtended,
            usersRepositoryExtended,
            mapper,
            logHelper
        );
    }
    //Add your custom code here

}
