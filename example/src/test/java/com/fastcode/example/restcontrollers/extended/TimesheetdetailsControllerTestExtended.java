package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.task.TaskAppServiceExtended;
import com.fastcode.example.application.extended.timeofftype.TimeofftypeAppServiceExtended;
import com.fastcode.example.application.extended.timesheet.TimesheetAppServiceExtended;
import com.fastcode.example.application.extended.timesheetdetails.TimesheetdetailsAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import com.fastcode.example.domain.extended.authorization.users.IUsersRepositoryExtended;
import com.fastcode.example.domain.extended.customer.ICustomerRepositoryExtended;
import com.fastcode.example.domain.extended.project.IProjectRepositoryExtended;
import com.fastcode.example.domain.extended.task.ITaskRepositoryExtended;
import com.fastcode.example.domain.extended.timeofftype.ITimeofftypeRepositoryExtended;
import com.fastcode.example.domain.extended.timesheet.ITimesheetRepositoryExtended;
import com.fastcode.example.domain.extended.timesheetdetails.ITimesheetdetailsRepositoryExtended;
import com.fastcode.example.domain.extended.timesheetstatus.ITimesheetstatusRepositoryExtended;
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
public class TimesheetdetailsControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("timesheetdetailsRepositoryExtended")
    protected ITimesheetdetailsRepositoryExtended timesheetdetails_repositoryExtended;

    @Autowired
    @Qualifier("taskRepositoryExtended")
    protected ITaskRepositoryExtended taskRepositoryExtended;

    @Autowired
    @Qualifier("timeofftypeRepositoryExtended")
    protected ITimeofftypeRepositoryExtended timeofftypeRepositoryExtended;

    @Autowired
    @Qualifier("timesheetRepositoryExtended")
    protected ITimesheetRepositoryExtended timesheetRepositoryExtended;

    @Autowired
    @Qualifier("projectRepositoryExtended")
    protected IProjectRepositoryExtended projectRepositoryExtended;

    @Autowired
    @Qualifier("customerRepositoryExtended")
    protected ICustomerRepositoryExtended customerRepositoryExtended;

    @Autowired
    @Qualifier("timesheetstatusRepositoryExtended")
    protected ITimesheetstatusRepositoryExtended timesheetstatusRepositoryExtended;

    @Autowired
    @Qualifier("usersRepositoryExtended")
    protected IUsersRepositoryExtended usersRepositoryExtended;

    @SpyBean
    @Qualifier("timesheetdetailsAppServiceExtended")
    protected TimesheetdetailsAppServiceExtended timesheetdetailsAppServiceExtended;

    @SpyBean
    @Qualifier("taskAppServiceExtended")
    protected TaskAppServiceExtended taskAppServiceExtended;

    @SpyBean
    @Qualifier("timeofftypeAppServiceExtended")
    protected TimeofftypeAppServiceExtended timeofftypeAppServiceExtended;

    @SpyBean
    @Qualifier("timesheetAppServiceExtended")
    protected TimesheetAppServiceExtended timesheetAppServiceExtended;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Timesheetdetails timesheetdetails;

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

        final TimesheetdetailsControllerExtended timesheetdetailsController = new TimesheetdetailsControllerExtended(
            timesheetdetailsAppServiceExtended,
            taskAppServiceExtended,
            timeofftypeAppServiceExtended,
            timesheetAppServiceExtended,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(timesheetdetailsController)
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
