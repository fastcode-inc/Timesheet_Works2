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
import com.fastcode.example.application.core.project.ProjectAppService;
import com.fastcode.example.application.core.task.TaskAppService;
import com.fastcode.example.application.core.task.dto.*;
import com.fastcode.example.application.core.timesheetdetails.TimesheetdetailsAppService;
import com.fastcode.example.application.core.usertask.UsertaskAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.SearchUtils;
import com.fastcode.example.domain.core.*;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.customer.ICustomerRepository;
import com.fastcode.example.domain.core.project.IProjectRepository;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.task.Task;
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
public class TaskControllerTest extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("taskRepository")
    protected ITaskRepository task_repository;

    @Autowired
    @Qualifier("projectRepository")
    protected IProjectRepository projectRepository;

    @Autowired
    @Qualifier("taskRepository")
    protected ITaskRepository taskRepository;

    @Autowired
    @Qualifier("customerRepository")
    protected ICustomerRepository customerRepository;

    @SpyBean
    @Qualifier("taskAppService")
    protected TaskAppService taskAppService;

    @SpyBean
    @Qualifier("projectAppService")
    protected ProjectAppService projectAppService;

    @SpyBean
    @Qualifier("timesheetdetailsAppService")
    protected TimesheetdetailsAppService timesheetdetailsAppService;

    @SpyBean
    @Qualifier("usertaskAppService")
    protected UsertaskAppService usertaskAppService;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Task task;

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

    @PostConstruct
    public void init() {
        emfs = emf;
    }

    @AfterClass
    public static void cleanup() {
        EntityManager em = emfs.createEntityManager();
        em.getTransaction().begin();
        em.createNativeQuery("truncate table timesheet.task CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.project CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.task CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.customer CASCADE").executeUpdate();
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

    public Task createEntity() {
        Project project = createProjectEntity();

        Task taskEntity = new Task();
        taskEntity.setDescription("1");
        taskEntity.setId(1L);
        taskEntity.setIsactive(false);
        taskEntity.setName("1");
        taskEntity.setVersiono(0L);
        taskEntity.setProject(project);

        return taskEntity;
    }

    public CreateTaskInput createTaskInput() {
        CreateTaskInput taskInput = new CreateTaskInput();
        taskInput.setDescription("5");
        taskInput.setIsactive(false);
        taskInput.setName("5");

        return taskInput;
    }

    public Task createNewEntity() {
        Task task = new Task();
        task.setDescription("3");
        task.setId(3L);
        task.setIsactive(false);
        task.setName("3");

        return task;
    }

    public Task createUpdateEntity() {
        Task task = new Task();
        task.setDescription("4");
        task.setId(4L);
        task.setIsactive(false);
        task.setName("4");

        return task;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final TaskController taskController = new TaskController(
            taskAppService,
            projectAppService,
            timesheetdetailsAppService,
            usertaskAppService,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(taskController)
                .setCustomArgumentResolvers(sortArgumentResolver)
                .setControllerAdvice()
                .build();
    }

    @Before
    public void initTest() {
        task = createEntity();
        List<Task> list = task_repository.findAll();
        if (!list.contains(task)) {
            task = task_repository.save(task);
        }
    }

    @Test
    public void FindById_IdIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/task/" + task.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindById_IdIsNotValid_ReturnStatusNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () -> mvc.perform(get("/task/999").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void CreateTask_TaskDoesNotExist_ReturnStatusOk() throws Exception {
        CreateTaskInput taskInput = createTaskInput();

        Project project = createProjectEntity();

        taskInput.setProjectid(Long.parseLong(project.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(taskInput);

        mvc.perform(post("/task").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }

    @Test
    public void DeleteTask_IdIsNotValid_ThrowEntityNotFoundException() {
        doReturn(null).when(taskAppService).findById(999L);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc.perform(delete("/task/999").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("There does not exist a task with a id=999"));
    }

    @Test
    public void Delete_IdIsValid_ReturnStatusNoContent() throws Exception {
        Task entity = createNewEntity();
        entity.setVersiono(0L);
        Project project = createProjectEntity();
        entity.setProject(project);
        entity = task_repository.save(entity);

        FindTaskByIdOutput output = new FindTaskByIdOutput();
        output.setId(entity.getId());
        output.setIsactive(entity.getIsactive());
        output.setName(entity.getName());

        Mockito.doReturn(output).when(taskAppService).findById(entity.getId());

        //    Mockito.when(taskAppService.findById(entity.getId())).thenReturn(output);

        mvc
            .perform(delete("/task/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
    }

    @Test
    public void UpdateTask_TaskDoesNotExist_ReturnStatusNotFound() throws Exception {
        doReturn(null).when(taskAppService).findById(999L);

        UpdateTaskInput task = new UpdateTaskInput();
        task.setDescription("999");
        task.setId(999L);
        task.setIsactive(false);
        task.setName("999");

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(task);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(put("/task/999").contentType(MediaType.APPLICATION_JSON).content(json))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Unable to update. Task with id=999 not found."));
    }

    @Test
    public void UpdateTask_TaskExists_ReturnStatusOk() throws Exception {
        Task entity = createUpdateEntity();
        entity.setVersiono(0L);

        Project project = createProjectEntity();
        entity.setProject(project);
        entity = task_repository.save(entity);
        FindTaskByIdOutput output = new FindTaskByIdOutput();
        output.setDescription(entity.getDescription());
        output.setId(entity.getId());
        output.setIsactive(entity.getIsactive());
        output.setName(entity.getName());
        output.setVersiono(entity.getVersiono());

        Mockito.when(taskAppService.findById(entity.getId())).thenReturn(output);

        UpdateTaskInput taskInput = new UpdateTaskInput();
        taskInput.setId(entity.getId());
        taskInput.setIsactive(entity.getIsactive());
        taskInput.setName(entity.getName());

        taskInput.setProjectid(Long.parseLong(project.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(taskInput);

        mvc
            .perform(put("/task/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());

        Task de = createUpdateEntity();
        de.setId(entity.getId());
        task_repository.delete(de);
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/task?search=id[equals]=1&limit=10&offset=1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsNotValid_ThrowException() throws Exception {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/task?search=taskid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property taskid not found!"));
    }

    @Test
    public void GetProject_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/task/999/project").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetProject_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(get("/task/" + task.getId() + "/project").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmptyAndPropertyIsNotValid_ThrowException() {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(taskAppService.parseTimesheetdetailsJoinColumn("taskid")).thenReturn(joinCol);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/task/1/timesheetdetails?search=abc[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property abc not found!"));
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(taskAppService.parseTimesheetdetailsJoinColumn("taskid")).thenReturn(joinCol);
        mvc
            .perform(
                get("/task/1/timesheetdetails?search=taskid[equals]=1&limit=10&offset=1")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmpty() {
        Mockito.when(taskAppService.parseTimesheetdetailsJoinColumn(anyString())).thenReturn(null);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/task/1/timesheetdetails?search=taskid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Invalid join column"));
    }

    @Test
    public void GetUsertasks_searchIsNotEmptyAndPropertyIsNotValid_ThrowException() {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(taskAppService.parseUsertasksJoinColumn("taskid")).thenReturn(joinCol);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/task/1/usertasks?search=abc[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property abc not found!"));
    }

    @Test
    public void GetUsertasks_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(taskAppService.parseUsertasksJoinColumn("taskid")).thenReturn(joinCol);
        mvc
            .perform(
                get("/task/1/usertasks?search=taskid[equals]=1&limit=10&offset=1")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetUsertasks_searchIsNotEmpty() {
        Mockito.when(taskAppService.parseUsertasksJoinColumn(anyString())).thenReturn(null);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/task/1/usertasks?search=taskid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Invalid join column"));
    }
}
