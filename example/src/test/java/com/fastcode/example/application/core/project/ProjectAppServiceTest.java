package com.fastcode.example.application.core.project;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fastcode.example.application.core.project.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.customer.ICustomerRepository;
import com.fastcode.example.domain.core.project.*;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.project.QProject;
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
public class ProjectAppServiceTest {

    @InjectMocks
    @Spy
    protected ProjectAppService _appService;

    @Mock
    protected IProjectRepository _projectRepository;

    @Mock
    protected ICustomerRepository _customerRepository;

    @Mock
    protected IProjectMapper _mapper;

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
    public void findProjectById_IdIsNotNullAndIdDoesNotExist_ReturnNull() {
        Optional<Project> nullOptional = Optional.ofNullable(null);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.findById(ID)).isEqualTo(null);
    }

    @Test
    public void findProjectById_IdIsNotNullAndIdExists_ReturnProject() {
        Project project = mock(Project.class);
        Optional<Project> projectOptional = Optional.of((Project) project);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(projectOptional);

        Assertions.assertThat(_appService.findById(ID)).isEqualTo(_mapper.projectToFindProjectByIdOutput(project));
    }

    @Test
    public void createProject_ProjectIsNotNullAndProjectDoesNotExist_StoreProject() {
        Project projectEntity = mock(Project.class);
        CreateProjectInput projectInput = new CreateProjectInput();

        Customer customer = mock(Customer.class);
        Optional<Customer> customerOptional = Optional.of((Customer) customer);
        projectInput.setCustomerid(15L);

        Mockito.when(_customerRepository.findById(any(Long.class))).thenReturn(customerOptional);

        Mockito.when(_mapper.createProjectInputToProject(any(CreateProjectInput.class))).thenReturn(projectEntity);
        Mockito.when(_projectRepository.save(any(Project.class))).thenReturn(projectEntity);

        Assertions
            .assertThat(_appService.create(projectInput))
            .isEqualTo(_mapper.projectToCreateProjectOutput(projectEntity));
    }

    @Test
    public void createProject_ProjectIsNotNullAndProjectDoesNotExistAndChildIsNullAndChildIsMandatory_ReturnNull() {
        CreateProjectInput project = mock(CreateProjectInput.class);

        Mockito.when(_mapper.createProjectInputToProject(any(CreateProjectInput.class))).thenReturn(null);
        Assertions.assertThat(_appService.create(project)).isEqualTo(null);
    }

    @Test
    public void createProject_ProjectIsNotNullAndProjectDoesNotExistAndChildIsNotNullAndChildIsMandatoryAndFindByIdIsNull_ReturnNull() {
        CreateProjectInput project = new CreateProjectInput();

        project.setCustomerid(15L);

        Optional<Customer> nullOptional = Optional.ofNullable(null);
        Mockito.when(_customerRepository.findById(any(Long.class))).thenReturn(nullOptional);

        //		Mockito.when(_customerRepository.findById(any(Long.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.create(project)).isEqualTo(null);
    }

    @Test
    public void updateProject_ProjectIsNotNullAndProjectDoesNotExistAndChildIsNullAndChildIsMandatory_ReturnNull() {
        UpdateProjectInput projectInput = mock(UpdateProjectInput.class);
        Project project = mock(Project.class);

        Optional<Project> projectOptional = Optional.of((Project) project);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(projectOptional);

        Mockito.when(_mapper.updateProjectInputToProject(any(UpdateProjectInput.class))).thenReturn(project);
        Assertions.assertThat(_appService.update(ID, projectInput)).isEqualTo(null);
    }

    @Test
    public void updateProject_ProjectIsNotNullAndProjectDoesNotExistAndChildIsNotNullAndChildIsMandatoryAndFindByIdIsNull_ReturnNull() {
        UpdateProjectInput projectInput = new UpdateProjectInput();
        projectInput.setCustomerid(15L);

        Project project = mock(Project.class);

        Optional<Project> projectOptional = Optional.of((Project) project);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(projectOptional);

        Mockito.when(_mapper.updateProjectInputToProject(any(UpdateProjectInput.class))).thenReturn(project);
        Optional<Customer> nullOptional = Optional.ofNullable(null);
        Mockito.when(_customerRepository.findById(any(Long.class))).thenReturn(nullOptional);

        //	Mockito.when(_customerRepository.findById(any(Long.class))).thenReturn(nullOptional);
        Assertions.assertThat(_appService.update(ID, projectInput)).isEqualTo(null);
    }

    @Test
    public void updateProject_ProjectIdIsNotNullAndIdExists_ReturnUpdatedProject() {
        Project projectEntity = mock(Project.class);
        UpdateProjectInput project = mock(UpdateProjectInput.class);

        Optional<Project> projectOptional = Optional.of((Project) projectEntity);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(projectOptional);

        Mockito.when(_mapper.updateProjectInputToProject(any(UpdateProjectInput.class))).thenReturn(projectEntity);
        Mockito.when(_projectRepository.save(any(Project.class))).thenReturn(projectEntity);
        Assertions
            .assertThat(_appService.update(ID, project))
            .isEqualTo(_mapper.projectToUpdateProjectOutput(projectEntity));
    }

    @Test
    public void deleteProject_ProjectIsNotNullAndProjectExists_ProjectRemoved() {
        Project project = mock(Project.class);
        Optional<Project> projectOptional = Optional.of((Project) project);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(projectOptional);

        _appService.delete(ID);
        verify(_projectRepository).delete(project);
    }

    @Test
    public void find_ListIsEmpty_ReturnList() throws Exception {
        List<Project> list = new ArrayList<>();
        Page<Project> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindProjectByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_projectRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void find_ListIsNotEmpty_ReturnList() throws Exception {
        List<Project> list = new ArrayList<>();
        Project project = mock(Project.class);
        list.add(project);
        Page<Project> foundPage = new PageImpl(list);
        Pageable pageable = mock(Pageable.class);
        List<FindProjectByIdOutput> output = new ArrayList<>();
        SearchCriteria search = new SearchCriteria();

        output.add(_mapper.projectToFindProjectByIdOutput(project));

        Mockito.when(_appService.search(any(SearchCriteria.class))).thenReturn(new BooleanBuilder());
        Mockito.when(_projectRepository.findAll(any(Predicate.class), any(Pageable.class))).thenReturn(foundPage);
        Assertions.assertThat(_appService.find(search, pageable)).isEqualTo(output);
    }

    @Test
    public void searchKeyValuePair_PropertyExists_ReturnBooleanBuilder() {
        QProject project = QProject.projectEntity;
        SearchFields searchFields = new SearchFields();
        searchFields.setOperator("equals");
        searchFields.setSearchValue("xyz");
        Map<String, SearchFields> map = new HashMap<>();
        map.put("description", searchFields);
        Map<String, String> searchMap = new HashMap<>();
        searchMap.put("xyz", String.valueOf(ID));
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(project.description.eq("xyz"));
        Assertions.assertThat(_appService.searchKeyValuePair(project, map, searchMap)).isEqualTo(builder);
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
        list.add("description");
        list.add("name");
        _appService.checkProperties(list);
    }

    @Test
    public void search_SearchIsNotNullAndSearchContainsCaseThree_ReturnBooleanBuilder() throws Exception {
        Map<String, SearchFields> map = new HashMap<>();
        QProject project = QProject.projectEntity;
        List<SearchFields> fieldsList = new ArrayList<>();
        SearchFields fields = new SearchFields();
        SearchCriteria search = new SearchCriteria();
        search.setType(3);
        search.setValue("xyz");
        search.setOperator("equals");
        fields.setFieldName("description");
        fields.setOperator("equals");
        fields.setSearchValue("xyz");
        fieldsList.add(fields);
        search.setFields(fieldsList);
        BooleanBuilder builder = new BooleanBuilder();
        builder.or(project.description.eq("xyz"));
        Mockito.doNothing().when(_appService).checkProperties(any(List.class));
        Mockito
            .doReturn(builder)
            .when(_appService)
            .searchKeyValuePair(any(QProject.class), any(HashMap.class), any(HashMap.class));

        Assertions.assertThat(_appService.search(search)).isEqualTo(builder);
    }

    @Test
    public void search_StringIsNull_ReturnNull() throws Exception {
        Assertions.assertThat(_appService.search(null)).isEqualTo(null);
    }

    //Customer
    @Test
    public void GetCustomer_IfProjectIdAndCustomerIdIsNotNullAndProjectExists_ReturnCustomer() {
        Project project = mock(Project.class);
        Optional<Project> projectOptional = Optional.of((Project) project);
        Customer customerEntity = mock(Customer.class);

        Mockito.when(_projectRepository.findById(any(Long.class))).thenReturn(projectOptional);

        Mockito.when(project.getCustomer()).thenReturn(customerEntity);
        Assertions
            .assertThat(_appService.getCustomer(ID))
            .isEqualTo(_mapper.customerToGetCustomerOutput(customerEntity, project));
    }

    @Test
    public void GetCustomer_IfProjectIdAndCustomerIdIsNotNullAndProjectDoesNotExist_ReturnNull() {
        Optional<Project> nullOptional = Optional.ofNullable(null);
        Mockito.when(_projectRepository.findById(anyLong())).thenReturn(nullOptional);
        Assertions.assertThat(_appService.getCustomer(ID)).isEqualTo(null);
    }

    @Test
    public void ParsetasksJoinColumn_KeysStringIsNotEmptyAndKeyValuePairDoesNotExist_ReturnNull() {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        String keyString = "15";
        joinColumnMap.put("projectid", keyString);
        Assertions.assertThat(_appService.parseTasksJoinColumn(keyString)).isEqualTo(joinColumnMap);
    }
}
