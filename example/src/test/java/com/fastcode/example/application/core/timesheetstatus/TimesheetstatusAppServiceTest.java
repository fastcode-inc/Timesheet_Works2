package com.fastcode.example.application.core.timesheetstatus;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fastcode.example.application.core.timesheetstatus.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.timesheetstatus.*;
import com.fastcode.example.domain.core.timesheetstatus.QTimesheetstatus;
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
public class TimesheetstatusAppServiceTest {

    @InjectMocks
    @Spy
    protected TimesheetstatusAppService _appService;

    @Mock
    protected ITimesheetstatusRepository _timesheetstatusRepository;

    @Mock
    protected ITimesheetstatusMapper _mapper;

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
    public void findTimesheetstatusById_IdIsNotNullAndIdDoesNotExist_ReturnNull() {
        Optional<Timesheetstatus> nullOptional = Optional.ofNullable(null);
        Mockito.when(_timesheetstatusRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.findById(ID)).isEqualTo(null);
    }

    @Test
    public void findTimesheetstatusById_IdIsNotNullAndIdExists_ReturnTimesheetstatus() {
        Timesheetstatus timesheetstatus = mock(Timesheetstatus.class);
        Optional<Timesheetstatus> timesheetstatusOptional = Optional.of((Timesheetstatus) timesheetstatus);
        Mockito.when(_timesheetstatusRepository.findById(anyLong())).thenReturn(timesheetstatusOptional);

        Assertions
            .assertThat(_appService.findById(ID))
            .isEqualTo(_mapper.timesheetstatusToFindTimesheetstatusByIdOutput(timesheetstatus));
    }

    @Test
    public void createTimesheetstatus_TimesheetstatusIsNotNullAndTimesheetstatusDoesNotExist_StoreTimesheetstatus() {
        Timesheetstatus timesheetstatusEntity = mock(Timesheetstatus.class);
        CreateTimesheetstatusInput timesheetstatusInput = new CreateTimesheetstatusInput();

        Mockito
            .when(_mapper.createTimesheetstatusInputToTimesheetstatus(any(CreateTimesheetstatusInput.class)))
            .thenReturn(timesheetstatusEntity);
        Mockito.when(_timesheetstatusRepository.save(any(Timesheetstatus.class))).thenReturn(timesheetstatusEntity);

        Assertions
            .assertThat(_appService.create(timesheetstatusInput))
            .isEqualTo(_mapper.timesheetstatusToCreateTimesheetstatusOutput(timesheetstatusEntity));
    }

    @Test
    public void updateTimesheetstatus_TimesheetstatusIdIsNotNullAndIdExists_ReturnUpdatedTimesheetstatus() {
        Timesheetstatus timesheetstatusEntity = mock(Timesheetstatus.class);
        UpdateTimesheetstatusInput timesheetstatus = mock(UpdateTimesheetstatusInput.class);

        Optional<Timesheetstatus> timesheetstatusOptional = Optional.of((Timesheetstatus) timesheetstatusEntity);
        Mockito.when(_timesheetstatusRepository.findById(anyLong())).thenReturn(timesheetstatusOptional);

        Mockito
            .when(_mapper.updateTimesheetstatusInputToTimesheetstatus(any(UpdateTimesheetstatusInput.class)))
            .thenReturn(timesheetstatusEntity);
        Mockito.when(_timesheetstatusRepository.save(any(Timesheetstatus.class))).thenReturn(timesheetstatusEntity);
        Assertions
            .assertThat(_appService.update(ID, timesheetstatus))
            .isEqualTo(_mapper.timesheetstatusToUpdateTimesheetstatusOutput(timesheetstatusEntity));
    }

    @Test
    public void deleteTimesheetstatus_TimesheetstatusIsNotNullAndTimesheetstatusExists_TimesheetstatusRemoved() {
        Timesheetstatus timesheetstatus = mock(Timesheetstatus.class);
        Optional<Timesheetstatus> timesheetstatusOptional = Optional.of((Timesheetstatus) timesheetstatus);
        Mockito.when(_timesheetstatusRepository.findById(anyLong())).thenReturn(timesheetstatusOptional);

        _appService.delete(ID);
        verify(_timesheetstatusRepository).delete(timesheetstatus);
    }

    @Test
    public void find_ListIsEmpty_ReturnList() throws Exception {
        List<Timesheetstatus> list = new ArrayList<>();
        Page<Timesheetstatus> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetstatusByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito
            .when(_timesheetstatusRepository.findAll(any(Predicate.class), any(Pageable.class)))
            .thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void find_ListIsNotEmpty_ReturnList() throws Exception {
        List<Timesheetstatus> list = new ArrayList<>();
        Timesheetstatus timesheetstatus = mock(Timesheetstatus.class);
        list.add(timesheetstatus);
        Page<Timesheetstatus> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindTimesheetstatusByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        output.add(_mapper.timesheetstatusToFindTimesheetstatusByIdOutput(timesheetstatus));

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito
            .when(_timesheetstatusRepository.findAll(any(Predicate.class), any(Pageable.class)))
            .thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void searchKeyValuePair_PropertyExists_ReturnBooleanBuilder() {
        QTimesheetstatus timesheetstatus = QTimesheetstatus.timesheetstatusEntity;
        SearchFields searchFields = new SearchFields();
        searchFields.setOperator("equals");
        searchFields.setSearchValue("xyz");
        Map<String, SearchFields> map = new HashMap<>();
        map.put("statusname", searchFields);
        Map<String, String> searchMap = new HashMap<>();
        searchMap.put("xyz", String.valueOf(ID));
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(timesheetstatus.statusname.eq("xyz"));
        Assertions.assertThat(_appService.searchKeyValuePair(timesheetstatus, map, searchMap)).isEqualTo(builder);
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
        list.add("statusname");
        _appService.checkProperties(list);
    }

    @Test
    public void search_SearchIsNotNullAndSearchContainsCaseThree_ReturnBooleanBuilder() throws Exception {
        Map<String, SearchFields> map = new HashMap<>();
        QTimesheetstatus timesheetstatus = QTimesheetstatus.timesheetstatusEntity;
        List<SearchFields> fieldsList = new ArrayList<>();
        SearchFields fields = new SearchFields();
        SearchCriteria search = new SearchCriteria();
        search.setType(3);
        search.setValue("xyz");
        search.setOperator("equals");
        fields.setFieldName("statusname");
        fields.setOperator("equals");
        fields.setSearchValue("xyz");
        fieldsList.add(fields);
        search.setFields(fieldsList);
        BooleanBuilder builder = new BooleanBuilder();
        builder.or(timesheetstatus.statusname.eq("xyz"));
        Mockito.doNothing().when(_appService).checkProperties(any(List.class));
        Mockito
            .doReturn(builder)
            .when(_appService)
            .searchKeyValuePair(any(QTimesheetstatus.class), any(HashMap.class), any(HashMap.class));

        Assertions.assertThat(_appService.search(search)).isEqualTo(builder);
    }

    @Test
    public void search_StringIsNull_ReturnNull() throws Exception {
        Assertions.assertThat(_appService.search(null)).isEqualTo(null);
    }

    @Test
    public void ParsetimesheetsJoinColumn_KeysStringIsNotEmptyAndKeyValuePairDoesNotExist_ReturnNull() {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        String keyString = "15";
        joinColumnMap.put("timesheetstatusid", keyString);
        Assertions.assertThat(_appService.parseTimesheetsJoinColumn(keyString)).isEqualTo(joinColumnMap);
    }
}
