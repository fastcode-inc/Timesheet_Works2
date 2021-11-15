package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.timeofftype.TimeofftypeAppServiceExtended;
import com.fastcode.example.application.extended.timesheetdetails.TimesheetdetailsAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.extended.timeofftype.ITimeofftypeRepositoryExtended;
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
public class TimeofftypeControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("timeofftypeRepositoryExtended")
    protected ITimeofftypeRepositoryExtended timeofftype_repositoryExtended;

    @SpyBean
    @Qualifier("timeofftypeAppServiceExtended")
    protected TimeofftypeAppServiceExtended timeofftypeAppServiceExtended;

    @SpyBean
    @Qualifier("timesheetdetailsAppServiceExtended")
    protected TimesheetdetailsAppServiceExtended timesheetdetailsAppServiceExtended;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Timeofftype timeofftype;

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

        final TimeofftypeControllerExtended timeofftypeController = new TimeofftypeControllerExtended(
            timeofftypeAppServiceExtended,
            timesheetdetailsAppServiceExtended,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(timeofftypeController)
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
