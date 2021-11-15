package com.fastcode.example.application.core.usertask;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fastcode.example.application.core.usertask.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.usertask.*;
import com.fastcode.example.domain.core.usertask.QUsertask;
import com.fastcode.example.domain.core.usertask.Usertask;
import com.fastcode.example.domain.core.usertask.UsertaskId;
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
public class UsertaskAppServiceTest {

    @InjectMocks
    @Spy
    protected UsertaskAppService _appService;

    @Mock
    protected IUsertaskRepository _usertaskRepository;

    @Mock
    protected ITaskRepository _taskRepository;

    @Mock
    protected IUsersRepository _usersRepository;

    @Mock
    protected IUsertaskMapper _mapper;

    @Mock
    protected Logger loggerMock;

    @Mock
    protected LoggingHelper logHelper;

    @Mock
    protected UsertaskId usertaskId;

    private static final Long ID = 15L;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(_appService);
        when(logHelper.getLogger()).thenReturn(loggerMock);
        doNothing().when(loggerMock).error(anyString());
    }

    @Test
    public void findUsertaskById_IdIsNotNullAndIdDoesNotExist_ReturnNull() {
        Optional<Usertask> nullOptional = Optional.ofNullable(null);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.findById(usertaskId)).isEqualTo(null);
    }

    @Test
    public void findUsertaskById_IdIsNotNullAndIdExists_ReturnUsertask() {
        Usertask usertask = mock(Usertask.class);
        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertask);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        Assertions
            .assertThat(_appService.findById(usertaskId))
            .isEqualTo(_mapper.usertaskToFindUsertaskByIdOutput(usertask));
    }

    @Test
    public void createUsertask_UsertaskIsNotNullAndUsertaskDoesNotExist_StoreUsertask() {
        Usertask usertaskEntity = mock(Usertask.class);
        CreateUsertaskInput usertaskInput = new CreateUsertaskInput();

        Task task = mock(Task.class);
        Optional<Task> taskOptional = Optional.of((Task) task);
        usertaskInput.setTaskid(15L);

        Mockito.when(_taskRepository.findById(any(Long.class))).thenReturn(taskOptional);

        Users users = mock(Users.class);
        Optional<Users> usersOptional = Optional.of((Users) users);
        usertaskInput.setUserid(15L);

        Mockito.when(_usersRepository.findById(any(Long.class))).thenReturn(usersOptional);

        Mockito.when(_mapper.createUsertaskInputToUsertask(any(CreateUsertaskInput.class))).thenReturn(usertaskEntity);
        Mockito.when(_usertaskRepository.save(any(Usertask.class))).thenReturn(usertaskEntity);

        Assertions
            .assertThat(_appService.create(usertaskInput))
            .isEqualTo(_mapper.usertaskToCreateUsertaskOutput(usertaskEntity));
    }

    @Test
    public void createUsertask_UsertaskIsNotNullAndUsertaskDoesNotExistAndChildIsNullAndChildIsNotMandatory_StoreUsertask() {
        Usertask usertask = mock(Usertask.class);
        CreateUsertaskInput usertaskInput = mock(CreateUsertaskInput.class);

        Mockito.when(_mapper.createUsertaskInputToUsertask(any(CreateUsertaskInput.class))).thenReturn(usertask);
        Mockito.when(_usertaskRepository.save(any(Usertask.class))).thenReturn(usertask);
        Assertions
            .assertThat(_appService.create(usertaskInput))
            .isEqualTo(_mapper.usertaskToCreateUsertaskOutput(usertask));
    }

    @Test
    public void updateUsertask_UsertaskIsNotNullAndUsertaskDoesNotExistAndChildIsNullAndChildIsNotMandatory_ReturnUpdatedUsertask() {
        Usertask usertask = mock(Usertask.class);
        UpdateUsertaskInput usertaskInput = mock(UpdateUsertaskInput.class);

        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertask);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        Mockito.when(_mapper.updateUsertaskInputToUsertask(any(UpdateUsertaskInput.class))).thenReturn(usertask);
        Mockito.when(_usertaskRepository.save(any(Usertask.class))).thenReturn(usertask);
        Assertions
            .assertThat(_appService.update(usertaskId, usertaskInput))
            .isEqualTo(_mapper.usertaskToUpdateUsertaskOutput(usertask));
    }

    @Test
    public void updateUsertask_UsertaskIdIsNotNullAndIdExists_ReturnUpdatedUsertask() {
        Usertask usertaskEntity = mock(Usertask.class);
        UpdateUsertaskInput usertask = mock(UpdateUsertaskInput.class);

        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertaskEntity);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        Mockito.when(_mapper.updateUsertaskInputToUsertask(any(UpdateUsertaskInput.class))).thenReturn(usertaskEntity);
        Mockito.when(_usertaskRepository.save(any(Usertask.class))).thenReturn(usertaskEntity);
        Assertions
            .assertThat(_appService.update(usertaskId, usertask))
            .isEqualTo(_mapper.usertaskToUpdateUsertaskOutput(usertaskEntity));
    }

    @Test
    public void deleteUsertask_UsertaskIsNotNullAndUsertaskExists_UsertaskRemoved() {
        Usertask usertask = mock(Usertask.class);
        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertask);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        _appService.delete(usertaskId);
        verify(_usertaskRepository).delete(usertask);
    }

    @Test
    public void find_ListIsEmpty_ReturnList() throws Exception {
        List<Usertask> list = new ArrayList<>();
        Page<Usertask> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindUsertaskByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_usertaskRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void find_ListIsNotEmpty_ReturnList() throws Exception {
        List<Usertask> list = new ArrayList<>();
        Usertask usertask = mock(Usertask.class);
        list.add(usertask);
        Page<Usertask> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindUsertaskByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        output.add(_mapper.usertaskToFindUsertaskByIdOutput(usertask));

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_usertaskRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void searchKeyValuePair_PropertyExists_ReturnBooleanBuilder() {
        QUsertask usertask = QUsertask.usertaskEntity;
        SearchFields searchFields = new SearchFields();
        searchFields.setOperator("equals");
        searchFields.setSearchValue("xyz");
        Map<String, SearchFields> map = new HashMap<>();
        Map<String, String> searchMap = new HashMap<>();
        searchMap.put("xyz", String.valueOf(ID));
        BooleanBuilder builder = new BooleanBuilder();
        Assertions.assertThat(_appService.searchKeyValuePair(usertask, map, searchMap)).isEqualTo(builder);
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
        _appService.checkProperties(list);
    }

    @Test
    public void search_SearchIsNotNullAndSearchContainsCaseThree_ReturnBooleanBuilder() throws Exception {
        Map<String, SearchFields> map = new HashMap<>();
        QUsertask usertask = QUsertask.usertaskEntity;
        List<SearchFields> fieldsList = new ArrayList<>();
        SearchFields fields = new SearchFields();
        SearchCriteria search = new SearchCriteria();
        search.setType(3);
        search.setValue("xyz");
        search.setOperator("equals");
        fields.setOperator("equals");
        fields.setSearchValue("xyz");
        fieldsList.add(fields);
        search.setFields(fieldsList);
        BooleanBuilder builder = new BooleanBuilder();
        Mockito.doNothing().when(_appService).checkProperties(any(List.class));
        Mockito
            .doReturn(builder)
            .when(_appService)
            .searchKeyValuePair(any(QUsertask.class), any(HashMap.class), any(HashMap.class));

        Assertions.assertThat(_appService.search(search)).isEqualTo(builder);
    }

    @Test
    public void search_StringIsNull_ReturnNull() throws Exception {
        Assertions.assertThat(_appService.search(null)).isEqualTo(null);
    }

    //Task
    @Test
    public void GetTask_IfUsertaskIdAndTaskIdIsNotNullAndUsertaskExists_ReturnTask() {
        Usertask usertask = mock(Usertask.class);
        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertask);
        Task taskEntity = mock(Task.class);

        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        Mockito.when(usertask.getTask()).thenReturn(taskEntity);
        Assertions
            .assertThat(_appService.getTask(usertaskId))
            .isEqualTo(_mapper.taskToGetTaskOutput(taskEntity, usertask));
    }

    @Test
    public void GetTask_IfUsertaskIdAndTaskIdIsNotNullAndUsertaskDoesNotExist_ReturnNull() {
        Optional<Usertask> nullOptional = Optional.ofNullable(null);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getTask(usertaskId)).isEqualTo(null);
    }

    //Users
    @Test
    public void GetUsers_IfUsertaskIdAndUsersIdIsNotNullAndUsertaskExists_ReturnUsers() {
        Usertask usertask = mock(Usertask.class);
        Optional<Usertask> usertaskOptional = Optional.of((Usertask) usertask);
        Users usersEntity = mock(Users.class);

        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(usertaskOptional);

        Mockito.when(usertask.getUsers()).thenReturn(usersEntity);
        Assertions
            .assertThat(_appService.getUsers(usertaskId))
            .isEqualTo(_mapper.usersToGetUsersOutput(usersEntity, usertask));
    }

    @Test
    public void GetUsers_IfUsertaskIdAndUsersIdIsNotNullAndUsertaskDoesNotExist_ReturnNull() {
        Optional<Usertask> nullOptional = Optional.ofNullable(null);
        Mockito.when(_usertaskRepository.findById(any(UsertaskId.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getUsers(usertaskId)).isEqualTo(null);
    }

    @Test
    public void ParseUsertaskKey_KeysStringIsNotEmptyAndKeyValuePairExists_ReturnUsertaskId() {
        String keyString = "taskid=15,userid=15";

        UsertaskId usertaskId = new UsertaskId();
        usertaskId.setTaskid(15L);
        usertaskId.setUserid(15L);

        Assertions.assertThat(_appService.parseUsertaskKey(keyString)).isEqualToComparingFieldByField(usertaskId);
    }

    @Test
    public void ParseUsertaskKey_KeysStringIsEmpty_ReturnNull() {
        String keyString = "";
        Assertions.assertThat(_appService.parseUsertaskKey(keyString)).isEqualTo(null);
    }

    @Test
    public void ParseUsertaskKey_KeysStringIsNotEmptyAndKeyValuePairDoesNotExist_ReturnNull() {
        String keyString = "taskid";

        Assertions.assertThat(_appService.parseUsertaskKey(keyString)).isEqualTo(null);
    }
}
