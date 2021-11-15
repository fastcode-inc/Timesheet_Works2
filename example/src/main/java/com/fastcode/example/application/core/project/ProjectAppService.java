package com.fastcode.example.application.core.project;

import com.fastcode.example.application.core.project.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.customer.ICustomerRepository;
import com.fastcode.example.domain.core.project.IProjectRepository;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.project.QProject;
import com.querydsl.core.BooleanBuilder;
import java.net.MalformedURLException;
import java.time.*;
import java.util.*;
import javax.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("projectAppService")
@RequiredArgsConstructor
public class ProjectAppService implements IProjectAppService {

    @Qualifier("projectRepository")
    @NonNull
    protected final IProjectRepository _projectRepository;

    @Qualifier("customerRepository")
    @NonNull
    protected final ICustomerRepository _customerRepository;

    @Qualifier("IProjectMapperImpl")
    @NonNull
    protected final IProjectMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateProjectOutput create(CreateProjectInput input) {
        Project project = mapper.createProjectInputToProject(input);
        Customer foundCustomer = null;
        if (input.getCustomerid() != null) {
            foundCustomer = _customerRepository.findById(input.getCustomerid()).orElse(null);

            if (foundCustomer != null) {
                foundCustomer.addProjects(project);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Project createdProject = _projectRepository.save(project);
        return mapper.projectToCreateProjectOutput(createdProject);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateProjectOutput update(Long projectId, UpdateProjectInput input) {
        Project existing = _projectRepository
            .findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Project project = mapper.updateProjectInputToProject(input);
        project.setTasksSet(existing.getTasksSet());
        Customer foundCustomer = null;

        if (input.getCustomerid() != null) {
            foundCustomer = _customerRepository.findById(input.getCustomerid()).orElse(null);

            if (foundCustomer != null) {
                foundCustomer.addProjects(project);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Project updatedProject = _projectRepository.save(project);
        return mapper.projectToUpdateProjectOutput(updatedProject);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long projectId) {
        Project existing = _projectRepository
            .findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (existing.getCustomer() != null) {
            existing.getCustomer().removeProjects(existing);
        }
        if (existing != null) {
            _projectRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindProjectByIdOutput findById(Long projectId) {
        Project foundProject = _projectRepository.findById(projectId).orElse(null);
        if (foundProject == null) return null;

        return mapper.projectToFindProjectByIdOutput(foundProject);
    }

    //Customer
    // ReST API Call - GET /project/1/customer
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetCustomerOutput getCustomer(Long projectId) {
        Project foundProject = _projectRepository.findById(projectId).orElse(null);
        if (foundProject == null) {
            logHelper.getLogger().error("There does not exist a project wth a id='{}'", projectId);
            return null;
        }
        Customer re = foundProject.getCustomer();
        return mapper.customerToGetCustomerOutput(re, foundProject);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindProjectByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException {
        Page<Project> foundProject = _projectRepository.findAll(search(search), pageable);
        List<Project> projectList = foundProject.getContent();
        Iterator<Project> projectIterator = projectList.iterator();
        List<FindProjectByIdOutput> output = new ArrayList<>();

        while (projectIterator.hasNext()) {
            Project project = projectIterator.next();
            output.add(mapper.projectToFindProjectByIdOutput(project));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QProject project = QProject.projectEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(project, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("customer") ||
                    list.get(i).replace("%20", "").trim().equals("customerid") ||
                    list.get(i).replace("%20", "").trim().equals("description") ||
                    list.get(i).replace("%20", "").trim().equals("enddate") ||
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("name") ||
                    list.get(i).replace("%20", "").trim().equals("startdate")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QProject project,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("description")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(project.description.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(project.description.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(project.description.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("enddate")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(project.enddate.eq(SearchUtils.stringToLocalDate(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(project.enddate.ne(SearchUtils.stringToLocalDate(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    LocalDate startLocalDate = SearchUtils.stringToLocalDate(details.getValue().getStartingValue());
                    LocalDate endLocalDate = SearchUtils.stringToLocalDate(details.getValue().getEndingValue());
                    if (startLocalDate != null && endLocalDate != null) {
                        builder.and(project.enddate.between(startLocalDate, endLocalDate));
                    } else if (endLocalDate != null) {
                        builder.and(project.enddate.loe(endLocalDate));
                    } else if (startLocalDate != null) {
                        builder.and(project.enddate.goe(startLocalDate));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(project.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(project.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(project.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            project.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(project.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(project.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("name")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(project.name.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(project.name.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(project.name.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("startdate")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        project.startdate.eq(SearchUtils.stringToLocalDate(details.getValue().getSearchValue()))
                    );
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        project.startdate.ne(SearchUtils.stringToLocalDate(details.getValue().getSearchValue()))
                    );
                } else if (details.getValue().getOperator().equals("range")) {
                    LocalDate startLocalDate = SearchUtils.stringToLocalDate(details.getValue().getStartingValue());
                    LocalDate endLocalDate = SearchUtils.stringToLocalDate(details.getValue().getEndingValue());
                    if (startLocalDate != null && endLocalDate != null) {
                        builder.and(project.startdate.between(startLocalDate, endLocalDate));
                    } else if (endLocalDate != null) {
                        builder.and(project.startdate.loe(endLocalDate));
                    } else if (startLocalDate != null) {
                        builder.and(project.startdate.goe(startLocalDate));
                    }
                }
            }

            if (details.getKey().replace("%20", "").trim().equals("customer")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(project.customer.customerid.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(project.customer.customerid.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(project.customer.customerid.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            project.customer.customerid.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(
                            project.customer.customerid.goe(Long.valueOf(details.getValue().getStartingValue()))
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(project.customer.customerid.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
        }

        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("customerid")) {
                builder.and(project.customer.customerid.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        return builder;
    }

    public Map<String, String> parseTasksJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("projectid", keysString);

        return joinColumnMap;
    }
}
