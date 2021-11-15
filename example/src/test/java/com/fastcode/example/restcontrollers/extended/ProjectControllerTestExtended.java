package com.fastcode.example.restcontrollers.extended;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.extended.customer.CustomerAppServiceExtended;
import com.fastcode.example.application.extended.project.ProjectAppServiceExtended;
import com.fastcode.example.application.extended.task.TaskAppServiceExtended;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.extended.customer.ICustomerRepositoryExtended;
import com.fastcode.example.domain.extended.project.IProjectRepositoryExtended;
import com.fastcode.example.domain.extended.project.IProjectRepositoryExtended;
import com.fastcode.example.domain.extended.task.ITaskRepositoryExtended;
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
public class ProjectControllerTestExtended extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("projectRepositoryExtended")
    protected IProjectRepositoryExtended project_repositoryExtended;

    @Autowired
    @Qualifier("customerRepositoryExtended")
    protected ICustomerRepositoryExtended customerRepositoryExtended;

    @Autowired
    @Qualifier("projectRepositoryExtended")
    protected IProjectRepositoryExtended projectRepositoryExtended;

    @Autowired
    @Qualifier("taskRepositoryExtended")
    protected ITaskRepositoryExtended taskRepositoryExtended;

    @SpyBean
    @Qualifier("projectAppServiceExtended")
    protected ProjectAppServiceExtended projectAppServiceExtended;

    @SpyBean
    @Qualifier("customerAppServiceExtended")
    protected CustomerAppServiceExtended customerAppServiceExtended;

    @SpyBean
    @Qualifier("taskAppServiceExtended")
    protected TaskAppServiceExtended taskAppServiceExtended;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Project project;

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

        final ProjectControllerExtended projectController = new ProjectControllerExtended(
            projectAppServiceExtended,
            customerAppServiceExtended,
            taskAppServiceExtended,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(projectController)
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
