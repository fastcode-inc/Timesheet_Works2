package com.fastcode.example.application.core.task;

import com.fastcode.example.application.core.task.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.project.IProjectRepository;
import com.fastcode.example.domain.core.project.Project;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.QTask;
import com.fastcode.example.domain.core.task.Task;
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

@Service("taskAppService")
@RequiredArgsConstructor
public class TaskAppService implements ITaskAppService {

    @Qualifier("taskRepository")
    @NonNull
    protected final ITaskRepository _taskRepository;

    @Qualifier("projectRepository")
    @NonNull
    protected final IProjectRepository _projectRepository;

    @Qualifier("ITaskMapperImpl")
    @NonNull
    protected final ITaskMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateTaskOutput create(CreateTaskInput input) {
        Task task = mapper.createTaskInputToTask(input);
        Project foundProject = null;
        if (input.getProjectid() != null) {
            foundProject = _projectRepository.findById(input.getProjectid()).orElse(null);

            if (foundProject != null) {
                foundProject.addTasks(task);
            }
        }

        Task createdTask = _taskRepository.save(task);
        return mapper.taskToCreateTaskOutput(createdTask);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateTaskOutput update(Long taskId, UpdateTaskInput input) {
        Task existing = _taskRepository
            .findById(taskId)
            .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        Task task = mapper.updateTaskInputToTask(input);
        task.setTimesheetdetailsSet(existing.getTimesheetdetailsSet());
        task.setUsertasksSet(existing.getUsertasksSet());
        Project foundProject = null;

        if (input.getProjectid() != null) {
            foundProject = _projectRepository.findById(input.getProjectid()).orElse(null);

            if (foundProject != null) {
                foundProject.addTasks(task);
            }
        }

        Task updatedTask = _taskRepository.save(task);
        return mapper.taskToUpdateTaskOutput(updatedTask);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long taskId) {
        Task existing = _taskRepository
            .findById(taskId)
            .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (existing.getProject() != null) {
            existing.getProject().removeTasks(existing);
        }
        if (existing != null) {
            _taskRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindTaskByIdOutput findById(Long taskId) {
        Task foundTask = _taskRepository.findById(taskId).orElse(null);
        if (foundTask == null) return null;

        return mapper.taskToFindTaskByIdOutput(foundTask);
    }

    //Project
    // ReST API Call - GET /task/1/project
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetProjectOutput getProject(Long taskId) {
        Task foundTask = _taskRepository.findById(taskId).orElse(null);
        if (foundTask == null) {
            logHelper.getLogger().error("There does not exist a task wth a id='{}'", taskId);
            return null;
        }
        Project re = foundTask.getProject();
        return mapper.projectToGetProjectOutput(re, foundTask);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindTaskByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException {
        Page<Task> foundTask = _taskRepository.findAll(search(search), pageable);
        List<Task> taskList = foundTask.getContent();
        Iterator<Task> taskIterator = taskList.iterator();
        List<FindTaskByIdOutput> output = new ArrayList<>();

        while (taskIterator.hasNext()) {
            Task task = taskIterator.next();
            output.add(mapper.taskToFindTaskByIdOutput(task));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QTask task = QTask.taskEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(task, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("project") ||
                    list.get(i).replace("%20", "").trim().equals("projectid") ||
                    list.get(i).replace("%20", "").trim().equals("description") ||
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("isactive") ||
                    list.get(i).replace("%20", "").trim().equals("name")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QTask task,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("description")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(task.description.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(task.description.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(task.description.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(task.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(task.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(task.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            task.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(task.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(task.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("isactive")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    (
                        details.getValue().getSearchValue().equalsIgnoreCase("true") ||
                        details.getValue().getSearchValue().equalsIgnoreCase("false")
                    )
                ) {
                    builder.and(task.isactive.eq(Boolean.parseBoolean(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    (
                        details.getValue().getSearchValue().equalsIgnoreCase("true") ||
                        details.getValue().getSearchValue().equalsIgnoreCase("false")
                    )
                ) {
                    builder.and(task.isactive.ne(Boolean.parseBoolean(details.getValue().getSearchValue())));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("name")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(task.name.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(task.name.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(task.name.ne(details.getValue().getSearchValue()));
                }
            }

            if (details.getKey().replace("%20", "").trim().equals("project")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(task.project.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(task.project.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(task.project.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            task.project.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(task.project.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(task.project.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
        }

        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("projectid")) {
                builder.and(task.project.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("project")) {
                builder.and(task.project.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        return builder;
    }

    public Map<String, String> parseTimesheetdetailsJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("taskid", keysString);

        return joinColumnMap;
    }

    public Map<String, String> parseUsertasksJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("taskid", keysString);

        return joinColumnMap;
    }
}
