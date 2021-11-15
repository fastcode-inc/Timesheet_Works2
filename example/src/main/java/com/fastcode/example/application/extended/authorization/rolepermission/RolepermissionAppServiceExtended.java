package com.fastcode.example.application.extended.authorization.rolepermission;

import com.fastcode.example.application.core.authorization.rolepermission.RolepermissionAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.authorization.permission.IPermissionRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.role.IRoleRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.rolepermission.IRolepermissionRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.usersrole.IUsersroleRepositoryExtended;
import com.fastcode.example.security.JWTAppService;
import org.springframework.stereotype.Service;

@Service("rolepermissionAppServiceExtended")
public class RolepermissionAppServiceExtended
    extends RolepermissionAppService
    implements IRolepermissionAppServiceExtended {

    public RolepermissionAppServiceExtended(
        JWTAppService jwtAppService,
        IUsersroleRepositoryExtended usersroleRepositoryExtended,
        IRolepermissionRepositoryExtended rolepermissionRepositoryExtended,
        IPermissionRepositoryExtended permissionRepositoryExtended,
        IRoleRepositoryExtended roleRepositoryExtended,
        IRolepermissionMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(
            jwtAppService,
            usersroleRepositoryExtended,
            rolepermissionRepositoryExtended,
            permissionRepositoryExtended,
            roleRepositoryExtended,
            mapper,
            logHelper
        );
    }
    //Add your custom code here

}
