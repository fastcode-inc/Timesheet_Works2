package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.authorization.permission.PermissionAppServiceExtended;
import com.fastcode.example.application.extended.authorization.role.RoleAppServiceExtended;
import com.fastcode.example.application.extended.authorization.rolepermission.RolepermissionAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.authorization.rolepermission.Rolepermission;
import com.fastcode.example.domain.extended.authorization.permission.IPermissionRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.role.IRoleRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.rolepermission.IRolepermissionRepositoryExtended;
import com.fastcode.example.security.JWTAppService;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import org.junit.AfterClass;
import org.junit.Before;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.core.env.Environment;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/*Uncomment below annotations before running tests*/
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest(properties = "spring.profiles.active=test")
public class RolepermissionControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("rolepermissionRepositoryExtended")
    protected IRolepermissionRepositoryExtended rolepermission_repositoryExtended;

    @Autowired
    @Qualifier("permissionRepositoryExtended")
    protected IPermissionRepositoryExtended permissionRepositoryExtended;

    @Autowired
    @Qualifier("roleRepositoryExtended")
    protected IRoleRepositoryExtended roleRepositoryExtended;

    @SpyBean
    @Qualifier("rolepermissionAppServiceExtended")
    protected RolepermissionAppServiceExtended rolepermissionAppServiceExtended;

    @SpyBean
    @Qualifier("permissionAppServiceExtended")
    protected PermissionAppServiceExtended permissionAppServiceExtended;

    @SpyBean
    @Qualifier("roleAppServiceExtended")
    protected RoleAppServiceExtended roleAppServiceExtended;

    @SpyBean
    protected JWTAppService jwtAppService;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Rolepermission rolepermission;

    protected MockMvc mvc;

    @Autowired
    EntityManagerFactory emf;

    static EntityManagerFactory emfs;

    @PostConstruct
    public void init() {
        emfs = emf;
    }

    @AfterClass
    public static void cleanup() {
        EntityManager em = emfs.createEntityManager();
        //add your code you want to execute after class
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final RolepermissionControllerExtended rolepermissionController = new RolepermissionControllerExtended(
            rolepermissionAppServiceExtended,
            permissionAppServiceExtended,
            roleAppServiceExtended,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(rolepermissionController)
                .setCustomArgumentResolvers(sortArgumentResolver)
                .setControllerAdvice()
                .build();
    }

    @Before
    public void initTest() {
        //add code required for initialization
    }
    //Add your custom code here
}
