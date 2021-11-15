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
import com.fastcode.example.application.core.timeofftype.TimeofftypeAppService;
import com.fastcode.example.application.core.timeofftype.dto.*;
import com.fastcode.example.application.core.timesheetdetails.TimesheetdetailsAppService;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.*;
import com.fastcode.example.domain.core.timeofftype.ITimeofftypeRepository;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
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
public class TimeofftypeControllerTest extends DatabaseContainerConfig {

    @Autowired
    protected SortHandlerMethodArgumentResolver sortArgumentResolver;

    @Autowired
    @Qualifier("timeofftypeRepository")
    protected ITimeofftypeRepository timeofftype_repository;

    @SpyBean
    @Qualifier("timeofftypeAppService")
    protected TimeofftypeAppService timeofftypeAppService;

    @SpyBean
    @Qualifier("timesheetdetailsAppService")
    protected TimesheetdetailsAppService timesheetdetailsAppService;

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

    static int relationCount = 10;
    static int yearCount = 1971;
    static int dayCount = 10;
    private BigDecimal bigdec = new BigDecimal(1.2);

    @PostConstruct
    public void init() {
        emfs = emf;
    }

    @AfterClass
    public static void cleanup() {
        EntityManager em = emfs.createEntityManager();
        em.getTransaction().begin();
        em.createNativeQuery("truncate table timesheet.timeofftype CASCADE").executeUpdate();
        em.getTransaction().commit();
    }

    public Timeofftype createEntity() {
        Timeofftype timeofftypeEntity = new Timeofftype();
        timeofftypeEntity.setId(1L);
        timeofftypeEntity.setTypename("1");
        timeofftypeEntity.setVersiono(0L);

        return timeofftypeEntity;
    }

    public CreateTimeofftypeInput createTimeofftypeInput() {
        CreateTimeofftypeInput timeofftypeInput = new CreateTimeofftypeInput();
        timeofftypeInput.setTypename("5");

        return timeofftypeInput;
    }

    public Timeofftype createNewEntity() {
        Timeofftype timeofftype = new Timeofftype();
        timeofftype.setId(3L);
        timeofftype.setTypename("3");

        return timeofftype;
    }

    public Timeofftype createUpdateEntity() {
        Timeofftype timeofftype = new Timeofftype();
        timeofftype.setId(4L);
        timeofftype.setTypename("4");

        return timeofftype;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final TimeofftypeController timeofftypeController = new TimeofftypeController(
            timeofftypeAppService,
            timesheetdetailsAppService,
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
        timeofftype = createEntity();
        List<Timeofftype> list = timeofftype_repository.findAll();
        if (!list.contains(timeofftype)) {
            timeofftype = timeofftype_repository.save(timeofftype);
        }
    }

    @Test
    public void FindById_IdIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/timeofftype/" + timeofftype.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindById_IdIsNotValid_ReturnStatusNotFound() {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(get("/timeofftype/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Not found"));
    }

    @Test
    public void CreateTimeofftype_TimeofftypeDoesNotExist_ReturnStatusOk() throws Exception {
        CreateTimeofftypeInput timeofftypeInput = createTimeofftypeInput();

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();

        String json = ow.writeValueAsString(timeofftypeInput);

        mvc
            .perform(post("/timeofftype").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
    }

    @Test
    public void DeleteTimeofftype_IdIsNotValid_ThrowEntityNotFoundException() {
        doReturn(null).when(timeofftypeAppService).findById(999L);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(delete("/timeofftype/999").contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("There does not exist a timeofftype with a id=999"));
    }

    @Test
    public void Delete_IdIsValid_ReturnStatusNoContent() throws Exception {
        Timeofftype entity = createNewEntity();
        entity.setVersiono(0L);
        entity = timeofftype_repository.save(entity);

        FindTimeofftypeByIdOutput output = new FindTimeofftypeByIdOutput();
        output.setId(entity.getId());
        output.setTypename(entity.getTypename());

        Mockito.doReturn(output).when(timeofftypeAppService).findById(entity.getId());

        //    Mockito.when(timeofftypeAppService.findById(entity.getId())).thenReturn(output);

        mvc
            .perform(delete("/timeofftype/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
    }

    @Test
    public void UpdateTimeofftype_TimeofftypeDoesNotExist_ReturnStatusNotFound() throws Exception {
        doReturn(null).when(timeofftypeAppService).findById(999L);

        UpdateTimeofftypeInput timeofftype = new UpdateTimeofftypeInput();
        timeofftype.setId(999L);
        timeofftype.setTypename("999");

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timeofftype);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(put("/timeofftype/999").contentType(MediaType.APPLICATION_JSON).content(json))
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Unable to update. Timeofftype with id=999 not found."));
    }

    @Test
    public void UpdateTimeofftype_TimeofftypeExists_ReturnStatusOk() throws Exception {
        Timeofftype entity = createUpdateEntity();
        entity.setVersiono(0L);

        entity = timeofftype_repository.save(entity);
        FindTimeofftypeByIdOutput output = new FindTimeofftypeByIdOutput();
        output.setId(entity.getId());
        output.setTypename(entity.getTypename());
        output.setVersiono(entity.getVersiono());

        Mockito.when(timeofftypeAppService.findById(entity.getId())).thenReturn(output);

        UpdateTimeofftypeInput timeofftypeInput = new UpdateTimeofftypeInput();
        timeofftypeInput.setId(entity.getId());
        timeofftypeInput.setTypename(entity.getTypename());

        ObjectWriter ow = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .writer()
            .withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(timeofftypeInput);

        mvc
            .perform(put("/timeofftype/" + entity.getId() + "/").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());

        Timeofftype de = createUpdateEntity();
        de.setId(entity.getId());
        timeofftype_repository.delete(de);
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsValid_ReturnStatusOk() throws Exception {
        mvc
            .perform(get("/timeofftype?search=id[equals]=1&limit=10&offset=1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    public void FindAll_SearchIsNotNullAndPropertyIsNotValid_ThrowException() throws Exception {
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timeofftype?search=timeofftypeid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new Exception("Wrong URL Format: Property timeofftypeid not found!"));
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmptyAndPropertyIsNotValid_ThrowException() {
        Map<String, String> joinCol = new HashMap<String, String>();
        joinCol.put("id", "1");

        Mockito.when(timeofftypeAppService.parseTimesheetdetailsJoinColumn("timeofftypeid")).thenReturn(joinCol);
        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timeofftype/1/timesheetdetails?search=abc[equals]=1&limit=10&offset=1")
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

        Mockito.when(timeofftypeAppService.parseTimesheetdetailsJoinColumn("timeofftypeid")).thenReturn(joinCol);
        mvc
            .perform(
                get("/timeofftype/1/timesheetdetails?search=timeofftypeid[equals]=1&limit=10&offset=1")
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk());
    }

    @Test
    public void GetTimesheetdetails_searchIsNotEmpty() {
        Mockito.when(timeofftypeAppService.parseTimesheetdetailsJoinColumn(anyString())).thenReturn(null);

        org.assertj.core.api.Assertions
            .assertThatThrownBy(
                () ->
                    mvc
                        .perform(
                            get("/timeofftype/1/timesheetdetails?search=timeofftypeid[equals]=1&limit=10&offset=1")
                                .contentType(MediaType.APPLICATION_JSON)
                        )
                        .andExpect(status().isOk())
            )
            .hasCause(new EntityNotFoundException("Invalid join column"));
    }
}
