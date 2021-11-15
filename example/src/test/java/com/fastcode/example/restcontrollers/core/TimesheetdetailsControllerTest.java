package com.fastcode.example.restcontrollers.core;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fastcode.example.DatabaseContainerConfig;
import com.fastcode.example.application.core.task.TaskAppService;
import com.fastcode.example.application.core.timeofftype.TimeofftypeAppService;
import com.fastcode.example.application.core.timesheet.TimesheetAppService;
import com.fastcode.example.application.core.timesheetdetails.TimesheetdetailsAppService;
import com.fastcode.example.application.core.timesheetdetails.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.SearchUtils;
import com.fastcode.example.domain.core.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.customer.ICustomerRepository;
import com.fastcode.example.domain.core.project.IProjectRepository;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.timeofftype.ITimeofftypeRepository;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetdetails.ITimesheetdetailsRepository;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import com.fastcode.example.domain.core.timesheetstatus.ITimesheetstatusRepository;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityNotFoundException;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.core.env.Environment;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(properties = "spring.profiles.active=test")
public class TimesheetdetailsControllerTest extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("timesheetdetailsRepository")
    protected ITimesheetdetailsRepository timesheetdetails_repository;

    @Autowired
    @Qualifier("taskRepository")
    protected ITaskRepository taskRepository;

    @Autowired
    @Qualifier("timeofftypeRepository")
    protected ITimeofftypeRepository timeofftypeRepository;

    @Autowired
    @Qualifier("timesheetRepository")
    protected ITimesheetRepository timesheetRepository;

    @Autowired
    @Qualifier("projectRepository")
    protected IProjectRepository projectRepository;

    @Autowired
    @Qualifier("customerRepository")
    protected ICustomerRepository customerRepository;

    @Autowired
    @Qualifier("timesheetstatusRepository")
    protected ITimesheetstatusRepository timesheetstatusRepository;

    @Autowired
    @Qualifier("usersRepository")
    protected IUsersRepository usersRepository;

    @SpyBean
    @Qualifier("timesheetdetailsAppService")
    protected TimesheetdetailsAppService timesheetdetailsAppService;

    @SpyBean
    @Qualifier("taskAppService")
    protected TaskAppService taskAppService;

    @SpyBean
    @Qualifier("timeofftypeAppService")
    protected TimeofftypeAppService timeofftypeAppService;

    @SpyBean
    @Qualifier("timesheetAppService")
    protected TimesheetAppService timesheetAppService;

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

    static int relationCount = 10;
    static int yearCount = 1971;
    static int dayCount = 10;
    private BigDecimal bigdec = new BigDecimal(1.2);

    int countProject = 10;

    int countTask = 10;

    int countCustomer = 10;

    int countTimeofftype = 10;

    int countTimesheet = 10;

    int countTimesheetstatus = 10;

    int countUsers = 10;

    @PostConstruct
    public void init() {
        emfs = emf;
    }

    @AfterClass
    public static void cleanup() {
        EntityManager em = emfs.createEntityManager();
        em.getTransaction().begin();
        em.createNativeQuery("truncate table timesheet.timesheetdetails CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.task CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.timeofftype CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.timesheet CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.project CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.customer CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.timesheetstatus CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.users CASCADE").executeUpdate();
        em.getTransaction().commit();
    }

    public Project createProjectEntity() {
        if (countProject > 60) {
            countProject = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Project projectEntity = new Project();

        projectEntity.setDescription(String.valueOf(relationCount));
        projectEntity.setEnddate(SearchUtils.stringToLocalDate(yearCount + "-09-" + dayCount));
        projectEntity.setId(Long.valueOf(relationCount));
        projectEntity.setName(String.valueOf(relationCount));
        projectEntity.setStartdate(SearchUtils.stringToLocalDate(yearCount + "-09-" + dayCount));
        projectEntity.setVersiono(0L);
        relationCount++;
        Customer customer = createCustomerEntity();
        projectEntity.setCustomer(customer);
        if (!projectRepository.findAll().contains(projectEntity)) {
            projectEntity = projectRepository.save(projectEntity);
        }
        countProject++;
        return projectEntity;
    }

    public Task createTaskEntity() {
        if (countTask > 60) {
            countTask = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Task taskEntity = new Task();

        taskEntity.setDescription(String.valueOf(relationCount));
        taskEntity.setId(Long.valueOf(relationCount));
        taskEntity.setIsactive(false);
        taskEntity.setName(String.valueOf(relationCount));
        taskEntity.setVersiono(0L);
        relationCount++;
        Project project = createProjectEntity();
        taskEntity.setProject(project);
        if (!taskRepository.findAll().contains(taskEntity)) {
            taskEntity = taskRepository.save(taskEntity);
        }
        countTask++;
        return taskEntity;
    }

    public Customer createCustomerEntity() {
        if (countCustomer > 60) {
            countCustomer = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Customer customerEntity = new Customer();

        customerEntity.setCustomerid(Long.valueOf(relationCount));
        customerEntity.setDescription(String.valueOf(relationCount));
        customerEntity.setIsactive(false);
        customerEntity.setName(String.valueOf(relationCount));
        customerEntity.setVersiono(0L);
        relationCount++;
        if (!customerRepository.findAll().contains(customerEntity)) {
            customerEntity = customerRepository.save(customerEntity);
        }
        countCustomer++;
        return customerEntity;
    }

    public Timeofftype createTimeofftypeEntity() {
        if (countTimeofftype > 60) {
            countTimeofftype = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Timeofftype timeofftypeEntity = new Timeofftype();

        timeofftypeEntity.setId(Long.valueOf(relationCount));
        timeofftypeEntity.setTypename(String.valueOf(relationCount));
        timeofftypeEntity.setVersiono(0L);
        relationCount++;
        if (!timeofftypeRepository.findAll().contains(timeofftypeEntity)) {
            timeofftypeEntity = timeofftypeRepository.save(timeofftypeEntity);
        }
        countTimeofftype++;
        return timeofftypeEntity;
    }

    public Timesheet createTimesheetEntity() {
        if (countTimesheet > 60) {
            countTimesheet = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Timesheet timesheetEntity = new Timesheet();

        timesheetEntity.setId(Long.valueOf(relationCount));
        timesheetEntity.setNotes(String.valueOf(relationCount));
        timesheetEntity.setPeriodendingdate(SearchUtils.stringToLocalDate(yearCount + "-09-" + dayCount));
        timesheetEntity.setPeriodstartingdate(SearchUtils.stringToLocalDate(yearCount + "-09-" + dayCount));
        timesheetEntity.setVersiono(0L);
        relationCount++;
        Timesheetstatus timesheetstatus = createTimesheetstatusEntity();
        timesheetEntity.setTimesheetstatus(timesheetstatus);
        Users users = createUsersEntity();
        timesheetEntity.setUsers(users);
        if (!timesheetRepository.findAll().contains(timesheetEntity)) {
            timesheetEntity = timesheetRepository.save(timesheetEntity);
        }
        countTimesheet++;
        return timesheetEntity;
    }

    public Timesheetstatus createTimesheetstatusEntity() {
        if (countTimesheetstatus > 60) {
            countTimesheetstatus = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Timesheetstatus timesheetstatusEntity = new Timesheetstatus();

        timesheetstatusEntity.setId(Long.valueOf(relationCount));
        timesheetstatusEntity.setStatusname(String.valueOf(relationCount));
        timesheetstatusEntity.setVersiono(0L);
        relationCount++;
        if (!timesheetstatusRepository.findAll().contains(timesheetstatusEntity)) {
            timesheetstatusEntity = timesheetstatusRepository.save(timesheetstatusEntity);
        }
        countTimesheetstatus++;
        return timesheetstatusEntity;
    }

    public Users createUsersEntity() {
        if (countUsers > 60) {
            countUsers = 10;
        }

        if (dayCount >= 31) {
            dayCount = 10;
            yearCount++;
        }

        Users usersEntity = new Users();

        usersEntity.setEmailaddress(String.valueOf(relationCount));
        usersEntity.setFirstname(String.valueOf(relationCount));
        usersEntity.setId(Long.valueOf(relationCount));
        usersEntity.setIsactive(false);
        usersEntity.setIsemailconfirmed(false);
        usersEntity.setJoinDate(SearchUtils.stringToLocalDate(yearCount + "-09-" + dayCount));
        usersEntity.setLastname(String.valueOf(relationCount));
        usersEntity.setPassword(String.valueOf(relationCount));
        usersEntity.setUsername(String.valueOf(relationCount));
        usersEntity.setVersiono(0L);
        relationCount++;
        if (!usersRepository.findAll().contains(usersEntity)) {
            usersEntity = usersRepository.save(usersEntity);
        }
        countUsers++;
        return usersEntity;
    }

    public Timesheetdetails createEntity() {
        Task task = createTaskEntity();
        Timeofftype timeofftype = createTimeofftypeEntity();
        Timesheet timesheet = createTimesheetEntity();

        Timesheetdetails timesheetdetailsEntity = new Timesheetdetails();
        timesheetdetailsEntity.setHours(new BigDecimal("1.1"));
        timesheetdetailsEntity.setId(1L);
        timesheetdetailsEntity.setNotes("1");
        timesheetdetailsEntity.setWorkdate(SearchUtils.stringToLocalDate("1996-09-01"));
        timesheetdetailsEntity.setVersiono(0L);
        timesheetdetailsEntity.setTask(task);
        timesheetdetailsEntity.setTimeofftype(timeofftype);
        timesheetdetailsEntity.setTimesheet(timesheet);

        return timesheetdetailsEntity;
    }

    public CreateTimesheetdetailsInput createTimesheetdetailsInput() {
        CreateTimesheetdetailsInput timesheetdetailsInput = new CreateTimesheetdetailsInput();
        timesheetdetailsInput.setHours(new BigDecimal("5.8"));
        timesheetdetailsInput.setNotes("5");
        timesheetdetailsInput.setWorkdate(SearchUtils.stringToLocalDate("1996-08-10"));

        return timesheetdetailsInput;
    }

    public Timesheetdetails createNewEntity() {
        Timesheetdetails timesheetdetails = new Timesheetdetails();
        timesheetdetails.setHours(new BigDecimal("3.3"));
        timesheetdetails.setId(3L);
        timesheetdetails.setNotes("3");
        timesheetdetails.setWorkdate(SearchUtils.stringToLocalDate("1996-08-11"));

        return timesheetdetails;
    }

    public Timesheetdetails createUpdateEntity() {
        Timesheetdetails timesheetdetails = new Timesheetdetails();
        timesheetdetails.setHours(new BigDecimal("3.3"));
        timesheetdetails.setId(4L);
        timesheetdetails.setNotes("4");
        timesheetdetails.setWorkdate(SearchUtils.stringToLocalDate("1996-09-09"));

        return timesheetdetails;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final TimesheetdetailsController timesheetdetailsController = new TimesheetdetailsController(
            timesheetdetailsAppService,
            taskAppService,
            timeofftypeAppService,
            timesheetAppService,
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
        timesheetdetails = createEntity();
        List<Timesheetdetails> list = timesheetdetails_repository.findAll();
        if (!list.contains(timesheetdetails)) {
            timesheetdetails = timesheetdetails_repository.save(timesheetdetails);
        }
    }

    @Test
    public void FindById_IdIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/timesheetdetails/" + timesheetdetails.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindById_IdIsNotValid_ReturnStatusNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheetdetails/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void CreateTimesheetdetails_TimesheetdetailsDoesNotExist_ReturnStatusOk() throws Exception {
        CreateTimesheetdetailsInput timesheetdetailsInput = createTimesheetdetailsInput();

        Task task = createTaskEntity();

        timesheetdetailsInput.setTaskid(Long.parseLong(task.getId().toString()));

        Timeofftype timeofftype = createTimeofftypeEntity();

        timesheetdetailsInput.setTimeofftypeid(Long.parseLong(timeofftype.getId().toString()));

        Timesheet timesheet = createTimesheetEntity();

        timesheetdetailsInput.setTimesheetid(Long.parseLong(timesheet.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timesheetdetailsInput);

        mvc
            .perform(post("/timesheetdetails").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
    }

    @Test
    public void CreateTimesheetdetails_timesheetDoesNotExists_ThrowEntityNotFoundException() throws Exception {
        CreateTimesheetdetailsInput timesheetdetails = createTimesheetdetailsInput();
        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timesheetdetails);

        org.assertj.core.api.Assertions.assertThatThrownBy(
            () ->
                mvc
                    .perform(post("/timesheetdetails").contentType(MediaType.APPLICATION_JSON).content(json))
                    .andExpect(status().isNotFound())
        );
    }

    @Test
    public void DeleteTimesheetdetails_IdIsNotValid_ThrowEntityNotFoundException() {
        doReturn(null).when(timesheetdetailsAppService).findById(999L);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(delete("/timesheetdetails/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("There does not exist a timesheetdetails with a id=999"));
    }

    @Test
    public void Delete_IdIsValid_ReturnStatusNoContent() throws Exception {
        Timesheetdetails entity = createNewEntity();
        entity.setVersiono(0L);
        Task task = createTaskEntity();
        entity.setTask(task);
        Timeofftype timeofftype = createTimeofftypeEntity();
        entity.setTimeofftype(timeofftype);
        Timesheet timesheet = createTimesheetEntity();
        entity.setTimesheet(timesheet);
        entity = timesheetdetails_repository.save(entity);

        FindTimesheetdetailsByIdOutput output = new FindTimesheetdetailsByIdOutput();
        output.setId(entity.getId());
        output.setWorkdate(entity.getWorkdate());

        Mockito.doReturn(output).when(timesheetdetailsAppService).findById(entity.getId());

        //    Mockito.when(timesheetdetailsAppService.findById(entity.getId())).thenReturn(output);

        mvc
            .perform(delete("/timesheetdetails/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
    }

    @Test
    public void UpdateTimesheetdetails_TimesheetdetailsDoesNotExist_ReturnStatusNotFound() throws Exception {
        doReturn(null).when(timesheetdetailsAppService).findById(999L);

        UpdateTimesheetdetailsInput timesheetdetails = new UpdateTimesheetdetailsInput();
        timesheetdetails.setHours(new BigDecimal("999"));
        timesheetdetails.setId(999L);
        timesheetdetails.setNotes("999");
        timesheetdetails.setWorkdate(SearchUtils.stringToLocalDate("1996-09-28"));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timesheetdetails);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(put("/timesheetdetails/999").contentType(MediaType.APPLICATION_JSON).content(json))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Unable to update. Timesheetdetails with id=999 not found."));
    }

    @Test
    public void UpdateTimesheetdetails_TimesheetdetailsExists_ReturnStatusOk() throws Exception {
        Timesheetdetails entity = createUpdateEntity();
        entity.setVersiono(0L);

        Task task = createTaskEntity();
        entity.setTask(task);
        Timeofftype timeofftype = createTimeofftypeEntity();
        entity.setTimeofftype(timeofftype);
        Timesheet timesheet = createTimesheetEntity();
        entity.setTimesheet(timesheet);
        entity = timesheetdetails_repository.save(entity);
        FindTimesheetdetailsByIdOutput output = new FindTimesheetdetailsByIdOutput();
        output.setHours(entity.getHours());
        output.setId(entity.getId());
        output.setNotes(entity.getNotes());
        output.setWorkdate(entity.getWorkdate());
        output.setVersiono(entity.getVersiono());

        Mockito.when(timesheetdetailsAppService.findById(entity.getId())).thenReturn(output);

        UpdateTimesheetdetailsInput timesheetdetailsInput = new UpdateTimesheetdetailsInput();
        timesheetdetailsInput.setId(entity.getId());
        timesheetdetailsInput.setWorkdate(entity.getWorkdate());

        timesheetdetailsInput.setTaskid(Long.parseLong(task.getId().toString()));
        timesheetdetailsInput.setTimeofftypeid(Long.parseLong(timeofftype.getId().toString()));
        timesheetdetailsInput.setTimesheetid(Long.parseLong(timesheet.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timesheetdetailsInput);

        mvc
            .perform(
                put("/timesheetdetails/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON).content(json)
            )
            .andExpect(status().isOk());

        Timesheetdetails de = createUpdateEntity();
        de.setId(entity.getId());
        timesheetdetails_repository.delete(de);
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(
                get("/timesheetdetails?search=id[equals]=1&limit=10&offset=1").contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsNotValid_ThrowException() throws Exception {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timesheetdetails?search=timesheetdetailsid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property timesheetdetailsid not found!"));
    }

    @Test
    public void GetTask_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheetdetails/999/task").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetTask_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(
                get("/timesheetdetails/" + timesheetdetails.getId() + "/task").contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimeofftype_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheetdetails/999/timeofftype").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetTimeofftype_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(
                get("/timesheetdetails/" + timesheetdetails.getId() + "/timeofftype")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimesheet_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheetdetails/999/timesheet").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetTimesheet_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(
                get("/timesheetdetails/" + timesheetdetails.getId() + "/timesheet")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }
}
