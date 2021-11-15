package com.fastcode.example.application.core.timesheet;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.timesheet.*;
import com.fastcode.example.domain.core.timesheet.QTimesheet;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetstatus.ITimesheetstatusRepository;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
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
public class TimesheetAppServiceTest {

    @InjectMocks
    @Spy
    protected TimesheetAppService _appService;

    @Mock
    protected ITimesheetRepository _timesheetRepository;

    @Mock
    protected ITimesheetstatusRepository _timesheetstatusRepository;

    @Mock
    protected IUsersRepository _usersRepository;

    @Mock
    protected ITimesheetMapper _mapper;

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
    public void findTimesheetById_IdIsNotNullAndIdDoesNotExist_ReturnNull() {
        Optional<Timesheet> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.findById(ID)).isEqualTo(null);
    }

    @Test
    public void findTimesheetById_IdIsNotNullAndIdExists_ReturnTimesheet() {
        Timesheet timesheet = mock(Timesheet.class);
        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(timesheetOptional);

        Assertions
            .assertThat(_appService.findById(ID))
            .isEqualTo(_mapper.timesheetToFindTimesheetByIdOutput(timesheet));
    }

    @Test
    public void createTimesheet_TimesheetIsNotNullAndTimesheetDoesNotExist_StoreTimesheet() {
        Timesheet timesheetEntity = mock(Timesheet.class);
        CreateTimesheetInput timesheetInput = new CreateTimesheetInput();

        Timesheetstatus timesheetstatus = mock(Timesheetstatus.class);
        Optional<Timesheetstatus> timesheetstatusOptional = Optional.of((Timesheetstatus) timesheetstatus);
        timesheetInput.setTimesheetstatusid(15L);

        Mockito.when(_timesheetstatusRepository.findById(any(Long.class))).thenReturn(timesheetstatusOptional);

        Users users = mock(Users.class);
        Optional<Users> usersOptional = Optional.of((Users) users);
        timesheetInput.setUserid(15L);

        Mockito.when(_usersRepository.findById(any(Long.class))).thenReturn(usersOptional);

        Mockito
            .when(_mapper.createTimesheetInputToTimesheet(any(CreateTimesheetInput.class)))
            .thenReturn(timesheetEntity);
        Mockito.when(_timesheetRepository.save(any(Timesheet.class))).thenReturn(timesheetEntity);

        Assertions
            .assertThat(_appService.create(timesheetInput))
            .isEqualTo(_mapper.timesheetToCreateTimesheetOutput(timesheetEntity));
    }

    @Test
    public void createTimesheet_TimesheetIsNotNullAndTimesheetDoesNotExistAndChildIsNullAndChildIsMandatory_ReturnNull() {
        CreateTimesheetInput timesheet = mock(CreateTimesheetInput.class);

        Mockito.when(_mapper.createTimesheetInputToTimesheet(any(CreateTimesheetInput.class))).thenReturn(null);
        Assertions.assertThat(_appService.create(timesheet)).isEqualTo(null);
    }

    @Test
    public void createTimesheet_TimesheetIsNotNullAndTimesheetDoesNotExistAndChildIsNotNullAndChildIsMandatoryAndFindByIdIsNull_ReturnNull() {
        CreateTimesheetInput timesheet = new CreateTimesheetInput();

        timesheet.setTimesheetstatusid(15L);

        Optional<Timesheetstatus> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetstatusRepository.findById(any(Long.class))).thenReturn(nullOptional);

        //		Mockito.when(_timesheetstatusRepository.findById(any(Long.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.create(timesheet)).isEqualTo(null);
    }

    @Test
    public void updateTimesheet_TimesheetIsNotNullAndTimesheetDoesNotExistAndChildIsNullAndChildIsMandatory_ReturnNull() {
        UpdateTimesheetInput timesheetInput = mock(UpdateTimesheetInput.class);
        Timesheet timesheet = mock(Timesheet.class);

        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(timesheetOptional);

        Mockito.when(_mapper.updateTimesheetInputToTimesheet(any(UpdateTimesheetInput.class))).thenReturn(timesheet);
        Assertions.assertThat(_appService.update(ID, timesheetInput)).isEqualTo(null);
    }

    @Test
    public void updateTimesheet_TimesheetIsNotNullAndTimesheetDoesNotExistAndChildIsNotNullAndChildIsMandatoryAndFindByIdIsNull_ReturnNull() {
        UpdateTimesheetInput timesheetInput = new UpdateTimesheetInput();
        timesheetInput.setTimesheetstatusid(15L);

        Timesheet timesheet = mock(Timesheet.class);

        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(timesheetOptional);

        Mockito.when(_mapper.updateTimesheetInputToTimesheet(any(UpdateTimesheetInput.class))).thenReturn(timesheet);
        Optional<Timesheetstatus> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetstatusRepository.findById(any(Long.class))).thenReturn(nullOptional);

        //	Mockito.when(_timesheetstatusRepository.findById(any(Long.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.update(ID, timesheetInput)).isEqualTo(null);
    }

    @Test
    public void updateTimesheet_TimesheetIdIsNotNullAndIdExists_ReturnUpdatedTimesheet() {
        Timesheet timesheetEntity = mock(Timesheet.class);
        UpdateTimesheetInput timesheet = mock(UpdateTimesheetInput.class);

        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheetEntity);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(timesheetOptional);

        Mockito
            .when(_mapper.updateTimesheetInputToTimesheet(any(UpdateTimesheetInput.class)))
            .thenReturn(timesheetEntity);
        Mockito.when(_timesheetRepository.save(any(Timesheet.class))).thenReturn(timesheetEntity);
        Assertions
            .assertThat(_appService.update(ID, timesheet))
            .isEqualTo(_mapper.timesheetToUpdateTimesheetOutput(timesheetEntity));
    }

    @Test
    public void deleteTimesheet_TimesheetIsNotNullAndTimesheetExists_TimesheetRemoved() {
        Timesheet timesheet = mock(Timesheet.class);
        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(timesheetOptional);

        _appService.delete(ID);
        verify(_timesheetRepository).delete(timesheet);
    }

    @Test
    public void find_ListIsEmpty_ReturnList() throws Exception {
        List<Timesheet> list = new ArrayList<>();
        Page<Timesheet> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_timesheetRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void find_ListIsNotEmpty_ReturnList() throws Exception {
        List<Timesheet> list = new ArrayList<>();
        Timesheet timesheet = mock(Timesheet.class);
        list.add(timesheet);
        Page<Timesheet> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        output.add(_mapper.timesheetToFindTimesheetByIdOutput(timesheet));

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_timesheetRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void searchKeyValuePair_PropertyExists_ReturnBooleanBuilder() {
        QTimesheet timesheet = QTimesheet.timesheetEntity;
        SearchFields searchFields = new SearchFields();
        searchFields.setOperator("equals");
        searchFields.setSearchValue("xyz");
        Map<String, SearchFields> map = new HashMap<>();
        map.put("notes", searchFields);
        Map<String, String> searchMap = new HashMap<>();
        searchMap.put("xyz", String.valueOf(ID));
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(timesheet.notes.eq("xyz"));
        Assertions.assertThat(_appService.searchKeyValuePair(timesheet, map, searchMap)).isEqualTo(builder);
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
        QTimesheet timesheet = QTimesheet.timesheetEntity;
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
        builder.or(timesheet.notes.eq("xyz"));
        Mockito.doNothing().when(_appService).checkProperties(any(List.class));
        Mockito
            .doReturn(builder)
            .when(_appService)
            .searchKeyValuePair(any(QTimesheet.class), any(HashMap.class), any(HashMap.class));

        Assertions.assertThat(_appService.search(search)).isEqualTo(builder);
    }

    @Test
    public void search_StringIsNull_ReturnNull() throws Exception {
        Assertions.assertThat(_appService.search(null)).isEqualTo(null);
    }

    //Timesheetstatus
    @Test
    public void GetTimesheetstatus_IfTimesheetIdAndTimesheetstatusIdIsNotNullAndTimesheetExists_ReturnTimesheetstatus() {
        Timesheet timesheet = mock(Timesheet.class);
        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Timesheetstatus timesheetstatusEntity = mock(Timesheetstatus.class);

        Mockito.when(_timesheetRepository.findById(any(Long.class))).thenReturn(timesheetOptional);

        Mockito.when(timesheet.getTimesheetstatus()).thenReturn(timesheetstatusEntity);
        Assertions
            .assertThat(_appService.getTimesheetstatus(ID))
            .isEqualTo(_mapper.timesheetstatusToGetTimesheetstatusOutput(timesheetstatusEntity, timesheet));
    }

    @Test
    public void GetTimesheetstatus_IfTimesheetIdAndTimesheetstatusIdIsNotNullAndTimesheetDoesNotExist_ReturnNull() {
        Optional<Timesheet> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getTimesheetstatus(ID)).isEqualTo(null);
    }

    //Users
    @Test
    public void GetUsers_IfTimesheetIdAndUsersIdIsNotNullAndTimesheetExists_ReturnUsers() {
        Timesheet timesheet = mock(Timesheet.class);
        Optional<Timesheet> timesheetOptional = Optional.of((Timesheet) timesheet);
        Users usersEntity = mock(Users.class);

        Mockito.when(_timesheetRepository.findById(any(Long.class))).thenReturn(timesheetOptional);

        Mockito.when(timesheet.getUsers()).thenReturn(usersEntity);
        Assertions
            .assertThat(_appService.getUsers(ID))
            .isEqualTo(_mapper.usersToGetUsersOutput(usersEntity, timesheet));
    }

    @Test
    public void GetUsers_IfTimesheetIdAndUsersIdIsNotNullAndTimesheetDoesNotExist_ReturnNull() {
        Optional<Timesheet> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getUsers(ID)).isEqualTo(null);
    }

    @Test
    public void ParsetimesheetdetailsJoinColumn_KeysStringIsNotEmptyAndKeyValuePairDoesNotExist_ReturnNull() {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        String keyString = "15";
        joinColumnMap.put("timesheetid", keyString);
        Assertions.assertThat(_appService.parseTimesheetdetailsJoinColumn(keyString)).isEqualTo(joinColumnMap);
    }
}
