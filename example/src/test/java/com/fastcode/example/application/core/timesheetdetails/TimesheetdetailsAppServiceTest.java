package com.fastcode.example.application.core.timesheetdetails;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fastcode.example.application.core.timesheetdetails.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.timeofftype.ITimeofftypeRepository;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetdetails.*;
import com.fastcode.example.domain.core.timesheetdetails.QTimesheetdetails;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.time.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
public class TimesheetdetailsAppServiceTest {

    @InjectMocks
    @Spy
    protected TimesheetdetailsAppService _appService;

    @Mock
    protected ITimesheetdetailsRepository _timesheetdetailsRepository;

    @Mock
    protected ITaskRepository _taskRepository;

    @Mock
    protected ITimeofftypeRepository _timeofftypeRepository;

    @Mock
    protected ITimesheetRepository _timesheetRepository;

    @Mock
    protected ITimesheetdetailsMapper _mapper;

    @Mock
    protected Logger loggerMock;

    @Mock
    protected LoggingHelper logHelper;

    protected static Long ID = 15L;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(_appService);
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());
    }

    @Test
    public void findTimesheetdetailsById_IdIsNotNullAndIdDoesNotExist_ReturnNull() {
        Optional<Timesheetdetails> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.findById(ID)).isEqualTo(null);
    }

    @Test
    public void findTimesheetdetailsById_IdIsNotNullAndIdExists_ReturnTimesheetdetails() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(timesheetdetailsOptional);

        Assertions
            .assertThat(_appService.findById(ID))
            .isEqualTo(_mapper.timesheetdetailsToFindTimesheetdetailsByIdOutput(timesheetdetails));
    }

    @Test
    public void createTimesheetdetails_TimesheetdetailsIsNotNullAndTimesheetdetailsDoesNotExist_StoreTimesheetdetails() {
        Timesheetdetails timesheetdetailsEntity = mock(Timesheetdetails.class);
        CreateTimesheetdetailsInput timesheetdetailsInput = new CreateTimesheetdetailsInput();

        Task task = mock(Task.class);
        Optional<Task> taskOptional = Optional.of((Task) task);
        timesheetdetailsInput.setTaskid(15L);

        Mockito.when(_taskRepository.findById(any(Long.class))).thenReturn(taskOptional);

        Timeofftype timeofftype = mock(Timeofftype.class);
        Optional<Timeofftype> timeofftypeOptional = Optional.of((Timeofftype) timeofftype);
        timesheetdetailsInput.setTimeofftypeid(15L);

        Mockito.when(_timeofftypeRepository.findById(any(Long.class))).thenReturn(timeofftypeOptional);

        Timesheet timesheet = mock(Timesheet.class);
        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        timesheetdetailsInput.setTimesheetid(15L);

        Mockito.when(_timesheetRepository.findById(any(Long.class))).thenReturn(timesheetOptional);

        Mockito
            .when(_mapper.createTimesheetdetailsInputToTimesheetdetails(any(CreateTimesheetdetailsInput.class)))
            .thenReturn(timesheetdetailsEntity);
        Mockito.when(_timesheetdetailsRepository.save(any(Timesheetdetails.class))).thenReturn(timesheetdetailsEntity);

        Assertions
            .assertThat(_appService.create(timesheetdetailsInput))
            .isEqualTo(_mapper.timesheetdetailsToCreateTimesheetdetailsOutput(timesheetdetailsEntity));
    }

    @Test
    public void createTimesheetdetails_TimesheetdetailsIsNotNullAndTimesheetdetailsDoesNotExistAndChildIsNullAndChildIsNotMandatory_StoreTimesheetdetails() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        CreateTimesheetdetailsInput timesheetdetailsInput = mock(CreateTimesheetdetailsInput.class);

        Mockito
            .when(_mapper.createTimesheetdetailsInputToTimesheetdetails(any(CreateTimesheetdetailsInput.class)))
            .thenReturn(timesheetdetails);
        Mockito.when(_timesheetdetailsRepository.save(any(Timesheetdetails.class))).thenReturn(timesheetdetails);
        Assertions
            .assertThat(_appService.create(timesheetdetailsInput))
            .isEqualTo(_mapper.timesheetdetailsToCreateTimesheetdetailsOutput(timesheetdetails));
    }

    @Test
    public void updateTimesheetdetails_TimesheetdetailsIsNotNullAndTimesheetdetailsDoesNotExistAndChildIsNullAndChildIsNotMandatory_ReturnUpdatedTimesheetdetails() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        UpdateTimesheetdetailsInput timesheetdetailsInput = mock(UpdateTimesheetdetailsInput.class);

        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(timesheetdetailsOptional);

        Mockito
            .when(_mapper.updateTimesheetdetailsInputToTimesheetdetails(any(UpdateTimesheetdetailsInput.class)))
            .thenReturn(timesheetdetails);
        Mockito.when(_timesheetdetailsRepository.save(any(Timesheetdetails.class))).thenReturn(timesheetdetails);
        Assertions
            .assertThat(_appService.update(ID, timesheetdetailsInput))
            .isEqualTo(_mapper.timesheetdetailsToUpdateTimesheetdetailsOutput(timesheetdetails));
    }

    @Test
    public void updateTimesheetdetails_TimesheetdetailsIdIsNotNullAndIdExists_ReturnUpdatedTimesheetdetails() {
        Timesheetdetails timesheetdetailsEntity = mock(Timesheetdetails.class);
        UpdateTimesheetdetailsInput timesheetdetails = mock(UpdateTimesheetdetailsInput.class);

        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetailsEntity);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(timesheetdetailsOptional);

        Mockito
            .when(_mapper.updateTimesheetdetailsInputToTimesheetdetails(any(UpdateTimesheetdetailsInput.class)))
            .thenReturn(timesheetdetailsEntity);
        Mockito.when(_timesheetdetailsRepository.save(any(Timesheetdetails.class))).thenReturn(timesheetdetailsEntity);
        Assertions
            .assertThat(_appService.update(ID, timesheetdetails))
            .isEqualTo(_mapper.timesheetdetailsToUpdateTimesheetdetailsOutput(timesheetdetailsEntity));
    }

    @Test
    public void deleteTimesheetdetails_TimesheetdetailsIsNotNullAndTimesheetdetailsExists_TimesheetdetailsRemoved() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(timesheetdetailsOptional);

        _appService.delete(ID);
        verify(_timesheetdetailsRepository).delete(timesheetdetails);
    }

    @Test
    public void find_ListIsEmpty_ReturnList() throws Exception {
        List<Timesheetdetails> list = new ArrayList<>();
        Page<Timesheetdetails> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetdetailsByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito
            .when(_timesheetdetailsRepository.findAll(any(Predicate.class), any(Pageable.class)))
            .thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void find_ListIsNotEmpty_ReturnList() throws Exception {
        List<Timesheetdetails> list = new ArrayList<>();
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        list.add(timesheetdetails);
        Page<Timesheetdetails> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetdetailsByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        output.add(_mapper.timesheetdetailsToFindTimesheetdetailsByIdOutput(timesheetdetails));

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito
            .when(_timesheetdetailsRepository.findAll(any(Predicate.class), any(Pageable.class)))
            .thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void searchKeyValuePair_PropertyExists_ReturnBooleanBuilder() {
        QTimesheetdetails timesheetdetails = QTimesheetdetails.timesheetdetailsEntity;
        SearchFields searchFields = new SearchFields();
        searchFields.setOperator("equals");
        searchFields.setSearchValue("xyz");
        Map<String, SearchFields> map = new HashMap<>();
        map.put("notes", searchFields);
        Map<String, String> searchMap = new HashMap<>();
        searchMap.put("xyz", String.valueOf(ID));
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(timesheetdetails.notes.eq("xyz"));
        Assertions.assertThat(_appService.searchKeyValuePair(timesheetdetails, map, searchMap)).isEqualTo(builder);
    }

    @Test(expected = Exception.class)
    public void checkProperties_PropertyDoesNotExist_ThrowException() throws Exception {
        List<String> list = new ArrayList<>();
        list.add("xyz");
        _appService.checkProperties(list);
    }

    @Test
    public void checkProperties_PropertyExists_ReturnNothing() throws Exception {
        List<String> list = new ArrayList<>();
        list.add("notes");
        _appService.checkProperties(list);
    }

    @Test
    public void search_SearchIsNotNullAndSearchContainsCaseThree_ReturnBooleanBuilder() throws Exception {
        Map<String, SearchFields> map = new HashMap<>();
        QTimesheetdetails timesheetdetails = QTimesheetdetails.timesheetdetailsEntity;
        List<SearchFields> fieldsList = new ArrayList<>();
        SearchFields fields = new SearchFields();
        SearchCriteria search = new SearchCriteria();
        search.setType(3);
        search.setValue("xyz");
        search.setOperator("equals");
        fields.setFieldName("notes");
        fields.setOperator("equals");
        fields.setSearchValue("xyz");
        fieldsList.add(fields);
        search.setFields(fieldsList);
        BooleanBuilder builder = new BooleanBuilder();
        builder.or(timesheetdetails.notes.eq("xyz"));
        Mockito.doNothing().when(_appService).checkProperties(any(List.class));
        Mockito
            .doReturn(builder)
            .when(_appService)
            .searchKeyValuePair(any(QTimesheetdetails.class), any(HashMap.class), any(HashMap.class));

        Assertions.assertThat(_appService.search(search)).isEqualTo(builder);
    }

    @Test
    public void search_StringIsNull_ReturnNull() throws Exception {
        Assertions.assertThat(_appService.search(null)).isEqualTo(null);
    }

    //Task
    @Test
    public void GetTask_IfTimesheetdetailsIdAndTaskIdIsNotNullAndTimesheetdetailsExists_ReturnTask() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Task taskEntity = mock(Task.class);

        Mockito.when(_timesheetdetailsRepository.findById(any(Long.class))).thenReturn(timesheetdetailsOptional);

        Mockito.when(timesheetdetails.getTask()).thenReturn(taskEntity);
        Assertions
            .assertThat(_appService.getTask(ID))
            .isEqualTo(_mapper.taskToGetTaskOutput(taskEntity, timesheetdetails));
    }

    @Test
    public void GetTask_IfTimesheetdetailsIdAndTaskIdIsNotNullAndTimesheetdetailsDoesNotExist_ReturnNull() {
        Optional<Timesheetdetails> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getTask(ID)).isEqualTo(null);
    }

    //Timeofftype
    @Test
    public void GetTimeofftype_IfTimesheetdetailsIdAndTimeofftypeIdIsNotNullAndTimesheetdetailsExists_ReturnTimeofftype() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Timeofftype timeofftypeEntity = mock(Timeofftype.class);

        Mockito.when(_timesheetdetailsRepository.findById(any(Long.class))).thenReturn(timesheetdetailsOptional);

        Mockito.when(timesheetdetails.getTimeofftype()).thenReturn(timeofftypeEntity);
        Assertions
            .assertThat(_appService.getTimeofftype(ID))
            .isEqualTo(_mapper.timeofftypeToGetTimeofftypeOutput(timeofftypeEntity, timesheetdetails));
    }

    @Test
    public void GetTimeofftype_IfTimesheetdetailsIdAndTimeofftypeIdIsNotNullAndTimesheetdetailsDoesNotExist_ReturnNull() {
        Optional<Timesheetdetails> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getTimeofftype(ID)).isEqualTo(null);
    }

    //Timesheet
    @Test
    public void GetTimesheet_IfTimesheetdetailsIdAndTimesheetIdIsNotNullAndTimesheetdetailsExists_ReturnTimesheet() {
        Timesheetdetails timesheetdetails = mock(Timesheetdetails.class);
        Optional<Timesheetdetails> timesheetdetailsOptional = Optional.of((Timesheetdetails) timesheetdetails);
        Timesheet timesheetEntity = mock(Timesheet.class);

        Mockito.when(_timesheetdetailsRepository.findById(any(Long.class))).thenReturn(timesheetdetailsOptional);

        Mockito.when(timesheetdetails.getTimesheet()).thenReturn(timesheetEntity);
        Assertions
            .assertThat(_appService.getTimesheet(ID))
            .isEqualTo(_mapper.timesheetToGetTimesheetOutput(timesheetEntity, timesheetdetails));
    }

    @Test
    public void GetTimesheet_IfTimesheetdetailsIdAndTimesheetIdIsNotNullAndTimesheetdetailsDoesNotExist_ReturnNull() {
        Optional<Timesheetdetails> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetdetailsRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getTimesheet(ID)).isEqualTo(null);
    }
}
