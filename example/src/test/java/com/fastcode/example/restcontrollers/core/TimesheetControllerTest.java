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
import com.fastcode.example.application.core.authorization.users.UsersAppService;
import com.fastcode.example.application.core.timesheet.TimesheetAppService;
import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.application.core.timesheetdetails.TimesheetdetailsAppService;
import com.fastcode.example.application.core.timesheetstatus.TimesheetstatusAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.SearchUtils;
import com.fastcode.example.domain.core.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheet.Timesheet;
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
public class TimesheetControllerTest extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("timesheetRepository")
    protected ITimesheetRepository timesheet_repository;

    @Autowired
    @Qualifier("timesheetstatusRepository")
    protected ITimesheetstatusRepository timesheetstatusRepository;

    @Autowired
    @Qualifier("usersRepository")
    protected IUsersRepository usersRepository;

    @Autowired
    @Qualifier("timesheetRepository")
    protected ITimesheetRepository timesheetRepository;

    @SpyBean
    @Qualifier("timesheetAppService")
    protected TimesheetAppService timesheetAppService;

    @SpyBean
    @Qualifier("timesheetdetailsAppService")
    protected TimesheetdetailsAppService timesheetdetailsAppService;

    @SpyBean
    @Qualifier("timesheetstatusAppService")
    protected TimesheetstatusAppService timesheetstatusAppService;

    @SpyBean
    @Qualifier("usersAppService")
    protected UsersAppService usersAppService;

    @SpyBean
    protected LoggingHelper logHelper;

    @SpyBean
    protected Environment env;

    @Mock
    protected Logger loggerMock;

    protected Timesheet timesheet;

    protected MockMvc mvc;

    @Autowired
    EntityManagerFactory emf;

    static EntityManagerFactory emfs;

    static int relationCount = 10;
    static int yearCount = 1971;
    static int dayCount = 10;
    private BigDecimal bigdec = new BigDecimal(1.2);

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
        em.createNativeQuery("truncate table timesheet.timesheet CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.timesheetstatus CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.users CASCADE").executeUpdate();
        em.createNativeQuery("truncate table timesheet.timesheet CASCADE").executeUpdate();
        em.getTransaction().commit();
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

    public Timesheet createEntity() {
        Timesheetstatus timesheetstatus = createTimesheetstatusEntity();
        Users users = createUsersEntity();

        Timesheet timesheetEntity = new Timesheet();
        timesheetEntity.setId(1L);
        timesheetEntity.setNotes("1");
        timesheetEntity.setPeriodendingdate(SearchUtils.stringToLocalDate("1996-09-01"));
        timesheetEntity.setPeriodstartingdate(SearchUtils.stringToLocalDate("1996-09-01"));
        timesheetEntity.setVersiono(0L);
        timesheetEntity.setTimesheetstatus(timesheetstatus);
        timesheetEntity.setUsers(users);

        return timesheetEntity;
    }

    public CreateTimesheetInput createTimesheetInput() {
        CreateTimesheetInput timesheetInput = new CreateTimesheetInput();
        timesheetInput.setNotes("5");
        timesheetInput.setPeriodendingdate(SearchUtils.stringToLocalDate("1996-08-10"));
        timesheetInput.setPeriodstartingdate(SearchUtils.stringToLocalDate("1996-08-10"));

        return timesheetInput;
    }

    public Timesheet createNewEntity() {
        Timesheet timesheet = new Timesheet();
        timesheet.setId(3L);
        timesheet.setNotes("3");
        timesheet.setPeriodendingdate(SearchUtils.stringToLocalDate("1996-08-11"));
        timesheet.setPeriodstartingdate(SearchUtils.stringToLocalDate("1996-08-11"));

        return timesheet;
    }

    public Timesheet createUpdateEntity() {
        Timesheet timesheet = new Timesheet();
        timesheet.setId(4L);
        timesheet.setNotes("4");
        timesheet.setPeriodendingdate(SearchUtils.stringToLocalDate("1996-09-09"));
        timesheet.setPeriodstartingdate(SearchUtils.stringToLocalDate("1996-09-09"));

        return timesheet;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final TimesheetController timesheetController = new TimesheetController(
            timesheetAppService,
            timesheetdetailsAppService,
            timesheetstatusAppService,
            usersAppService,
            logHelper,
            env
        );
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());

        this.mvc =
            MockMvcBuilders
                .standaloneSetup(timesheetController)
                .setCustomArgumentResolvers(sortArgumentResolver)
                .setControllerAdvice()
                .build();
    }

    @Before
    public void initTest() {
        timesheet = createEntity();
        List<Timesheet> list = timesheet_repository.findAll();
        if (!list.contains(timesheet)) {
            timesheet = timesheet_repository.save(timesheet);
        }
    }

    @Test
    public void FindById_IdIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/timesheet/" + timesheet.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindById_IdIsNotValid_ReturnStatusNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheet/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void CreateTimesheet_TimesheetDoesNotExist_ReturnStatusOk() throws Exception {
        CreateTimesheetInput timesheetInput = createTimesheetInput();

        Timesheetstatus timesheetstatus = createTimesheetstatusEntity();

        timesheetInput.setTimesheetstatusid(Long.parseLong(timesheetstatus.getId().toString()));

        Users users = createUsersEntity();

        timesheetInput.setUserid(Long.parseLong(users.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timesheetInput);

        mvc
            .perform(post("/timesheet").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
    }

    @Test
    public void CreateTimesheet_timesheetstatusDoesNotExists_ThrowEntityNotFoundException() throws Exception {
        CreateTimesheetInput timesheet = createTimesheetInput();
        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timesheet);

        org.assertj.core.api.Assertions.assertThatThrownBy(
            () ->
                mvc
                    .perform(post("/timesheet").contentType(MediaType.APPLICATION_JSON).content(json))
                    .andExpect(status().isNotFound())
        );
    }

    @Test
    public void CreateTimesheet_usersDoesNotExists_ThrowEntityNotFoundException() throws Exception {
        CreateTimesheetInput timesheet = createTimesheetInput();
        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timesheet);

        org.assertj.core.api.Assertions.assertThatThrownBy(
            () ->
                mvc
                    .perform(post("/timesheet").contentType(MediaType.APPLICATION_JSON).content(json))
                    .andExpect(status().isNotFound())
        );
    }

    @Test
    public void DeleteTimesheet_IdIsNotValid_ThrowEntityNotFoundException() {
        doReturn(null).when(timesheetAppService).findById(999L);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(delete("/timesheet/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("There does not exist a timesheet with a id=999"));
    }

    @Test
    public void Delete_IdIsValid_ReturnStatusNoContent() throws Exception {
        Timesheet entity = createNewEntity();
        entity.setVersiono(0L);
        Timesheetstatus timesheetstatus = createTimesheetstatusEntity();
        entity.setTimesheetstatus(timesheetstatus);
        Users users = createUsersEntity();
        entity.setUsers(users);
        entity = timesheet_repository.save(entity);

        FindTimesheetByIdOutput output = new FindTimesheetByIdOutput();
        output.setId(entity.getId());
        output.setPeriodendingdate(entity.getPeriodendingdate());
        output.setPeriodstartingdate(entity.getPeriodstartingdate());

        Mockito.doReturn(output).when(timesheetAppService).findById(entity.getId());

        //    Mockito.when(timesheetAppService.findById(entity.getId())).thenReturn(output);

        mvc
            .perform(delete("/timesheet/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
    }

    @Test
    public void UpdateTimesheet_TimesheetDoesNotExist_ReturnStatusNotFound() throws Exception {
        doReturn(null).when(timesheetAppService).findById(999L);

        UpdateTimesheetInput timesheet = new UpdateTimesheetInput();
        timesheet.setId(999L);
        timesheet.setNotes("999");
        timesheet.setPeriodendingdate(SearchUtils.stringToLocalDate("1996-09-28"));
        timesheet.setPeriodstartingdate(SearchUtils.stringToLocalDate("1996-09-28"));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timesheet);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(put("/timesheet/999").contentType(MediaType.APPLICATION_JSON).content(json))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Unable to update. Timesheet with id=999 not found."));
    }

    @Test
    public void UpdateTimesheet_TimesheetExists_ReturnStatusOk() throws Exception {
        Timesheet entity = createUpdateEntity();
        entity.setVersiono(0L);

        Timesheetstatus timesheetstatus = createTimesheetstatusEntity();
        entity.setTimesheetstatus(timesheetstatus);
        Users users = createUsersEntity();
        entity.setUsers(users);
        entity = timesheet_repository.save(entity);
        FindTimesheetByIdOutput output = new FindTimesheetByIdOutput();
        output.setId(entity.getId());
        output.setNotes(entity.getNotes());
        output.setPeriodendingdate(entity.getPeriodendingdate());
        output.setPeriodstartingdate(entity.getPeriodstartingdate());
        output.setVersiono(entity.getVersiono());

        Mockito.when(timesheetAppService.findById(entity.getId())).thenReturn(output);

        UpdateTimesheetInput timesheetInput = new UpdateTimesheetInput();
        timesheetInput.setId(entity.getId());
        timesheetInput.setPeriodendingdate(entity.getPeriodendingdate());
        timesheetInput.setPeriodstartingdate(entity.getPeriodstartingdate());

        timesheetInput.setTimesheetstatusid(Long.parseLong(timesheetstatus.getId().toString()));
        timesheetInput.setUserid(Long.parseLong(users.getId().toString()));

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timesheetInput);

        mvc
            .perform(put("/timesheet/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());

        Timesheet de = createUpdateEntity();
        de.setId(entity.getId());
        timesheet_repository.delete(de);
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/timesheet?search=id[equals]=1&limit=10&offset=1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsNotValid_ThrowException() throws Exception {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timesheet?search=timesheetid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property timesheetid not found!"));
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmptyAndPropertyIsNotValid_ThrowException() {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(timesheetAppService.parseTimesheetdetailsJoinColumn("timesheetid")).thenReturn(joinCol);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timesheet/1/timesheetdetails?search=abc[equals]=1&limit=10&offset=1")
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

        Mockito.when(timesheetAppService.parseTimesheetdetailsJoinColumn("timesheetid")).thenReturn(joinCol);
        mvc
            .perform(
                get("/timesheet/1/timesheetdetails?search=timesheetid[equals]=1&limit=10&offset=1")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmpty() {
        Mockito.when(timesheetAppService.parseTimesheetdetailsJoinColumn(anyString())).thenReturn(null);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timesheet/1/timesheetdetails?search=timesheetid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Invalid join column"));
    }

    @Test
    public void GetTimesheetstatus_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheet/999/timesheetstatus").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetTimesheetstatus_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(
                get("/timesheet/" + timesheet.getId() + "/timesheetstatus").contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetUsers_IdIsNotEmptyAndIdDoesNotExist_ReturnNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timesheet/999/users").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void GetUsers_searchIsNotEmptyAndPropertyIsValid_ReturnList() throws Exception {
        mvc
            .perform(get("/timesheet/" + timesheet.getId() + "/users").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }
}
