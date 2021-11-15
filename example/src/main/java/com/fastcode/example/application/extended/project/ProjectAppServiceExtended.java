package com.fastcode.example.application.extended.project;

import com.fastcode.example.application.core.project.ProjectAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.extended.customer.ICustomerRepositoryExtended;
import com.fastcode.example.domain.extended.project.IProjectRepositoryExtended;
import org.springframework.stereotype.Service;

@Service("projectAppServiceExtended")
public class ProjectAppServiceExtended extends ProjectAppService implements IProjectAppServiceExtended {

    public ProjectAppServiceExtended(
        IProjectRepositoryExtended projectRepositoryExtended,
        ICustomerRepositoryExtended customerRepositoryExtended,
        IProjectMapperExtended mapper,
        LoggingHelper logHelper
    ) {
        super(projectRepositoryExtended, customerRepositoryExtended, mapper, logHelper);
    }
    //Add your custom code here

}
