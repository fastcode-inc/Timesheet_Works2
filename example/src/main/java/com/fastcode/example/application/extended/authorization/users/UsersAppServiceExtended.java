package com.fastcode.example.application.extended.authorization.users;

import com.fastcode.example.application.core.authorization.users.UsersAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.authorization.userspreference.IUserspreferenceRepository;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("usersAppServiceExtended")
public class UsersAppServiceExtended extends UsersAppService implements IUsersAppServiceExtended {

    public UsersAppServiceExtended(
        IUsersRepositoryExtended usersRepositoryExtended,
        IUserspreferenceRepository userspreferenceRepository,
        IUsersMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(usersRepositoryExtended, userspreferenceRepository, mapper, logHelper);
    }
    //Add your custom code here

}
