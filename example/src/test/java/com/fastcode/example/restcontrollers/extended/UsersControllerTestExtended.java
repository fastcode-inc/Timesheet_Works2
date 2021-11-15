package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.authorization.users.UsersAppServiceExtended;
import com.fastcode.example.application.extended.authorization.userspermission.UserspermissionAppServiceExtended;
import com.fastcode.example.application.extended.authorization.usersrole.UsersroleAppServiceExtended;
import com.fastcode.example.application.extended.timesheet.TimesheetAppServiceExtended;
import com.fastcode.example.application.extended.usertask.UsertaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.timesheet.ITimesheetRepositoryExtended;
import com.fastcode.example.domain.extended.timesheetstatus.ITimesheetstatusRepositoryExtended;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/*Uncomment below annotations before running tests*/
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest(properties = "spring.profiles.active=test")
public class UsersControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("usersRepositoryExtended")
    protected IUsersRepositoryExtended users_repositoryExtended;

    @Autowired
    @Qualifier("timesheetRepositoryExtended")
    protected ITimesheetRepositoryExtended timesheetRepositoryExtended;

    @Autowired
    @Qualifier("timesheetstatusRepositoryExtended")
    protected ITimesheetstatusRepositoryExtended timesheetstatusRepositoryExtended;

    @Autowired
    @Qualifier("usersRepositoryExtended")
    protected IUsersRepositoryExtended usersRepositoryExtended;

    @SpyBean
    @Qualifier("usersAppServiceExtended")
    protected UsersAppServiceExtended usersAppServiceExtended;

    @SpyBean
    @Qualifier("timesheetAppServiceExtended")
    protected TimesheetAppServiceExtended timesheetAppServiceExtended;

    @SpyBean
    @Qualifier("userspermissionAppServiceExtended")
    protected UserspermissionAppServiceExtended userspermissionAppServiceExtended;

    @SpyBean
    @Qualifier("usersroleAppServiceExtended")
    protected UsersroleAppServiceExtended usersroleAppServiceExtended;

    @SpyBean
    @Qualifier("usertaskAppServiceExtended")
    protected UsertaskAppServiceExtended usertaskAppServiceExtended;

    @SpyBean
    protected IUserspreferenceManager userspreferenceManager;

    @SpyBean
    protected JWTAppService jwtAppService;

    @SpyBean
    protected PasswordEncoder pEncoder;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Users users;

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

        final UsersControllerExtended usersController = new UsersControllerExtended(
            usersAppServiceExtended,
            timesheetAppServiceExtended,
            userspermissionAppServiceExtended,
            usersroleAppServiceExtended,
            usertaskAppServiceExtended,
            pEncoder,
            jwtAppService,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(usersController)
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
