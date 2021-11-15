package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.authorization.permission.PermissionAppServiceExtended;
import com.fastcode.example.application.extended.authorization.rolepermission.RolepermissionAppServiceExtended;
import com.fastcode.example.application.extended.authorization.userspermission.UserspermissionAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.authorization.permission.Permission;
import com.fastcode.example.domain.extended.authorization.permission.IPermissionRepositoryExtended;
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
public class PermissionControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("permissionRepositoryExtended")
    protected IPermissionRepositoryExtended permission_repositoryExtended;

    @SpyBean
    @Qualifier("permissionAppServiceExtended")
    protected PermissionAppServiceExtended permissionAppServiceExtended;

    @SpyBean
    @Qualifier("rolepermissionAppServiceExtended")
    protected RolepermissionAppServiceExtended rolepermissionAppServiceExtended;

    @SpyBean
    @Qualifier("userspermissionAppServiceExtended")
    protected UserspermissionAppServiceExtended userspermissionAppServiceExtended;

    @SpyBean
    protected JWTAppService jwtAppService;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Permission permission;

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

        final PermissionControllerExtended permissionController = new PermissionControllerExtended(
            permissionAppServiceExtended,
            rolepermissionAppServiceExtended,
            userspermissionAppServiceExtended,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(permissionController)
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
