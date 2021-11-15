package com.fastcode.example.application.core.usertask;

import com.fastcode.example.application.core.usertask.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.usertask.IUsertaskRepository;
import com.fastcode.example.domain.core.usertask.QUsertask;
import com.fastcode.example.domain.core.usertask.Usertask;
import com.fastcode.example.domain.core.usertask.UsertaskId;
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

@Service("usertaskAppService")
@RequiredArgsConstructor
public class UsertaskAppService implements IUsertaskAppService {

    @Qualifier("usertaskRepository")
    @NonNull
    protected final IUsertaskRepository _usertaskRepository;

    @Qualifier("taskRepository")
    @NonNull
    protected final ITaskRepository _taskRepository;

    @Qualifier("usersRepository")
    @NonNull
    protected final IUsersRepository _usersRepository;

    @Qualifier("IUsertaskMapperImpl")
    @NonNull
    protected final IUsertaskMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateUsertaskOutput create(CreateUsertaskInput input) {
        Usertask usertask = mapper.createUsertaskInputToUsertask(input);
        Task foundTask = null;
        Users foundUsers = null;
        if (input.getTaskid() != null) {
            foundTask = _taskRepository.findById(input.getTaskid()).orElse(null);

            if (foundTask != null) {
                foundTask.addUsertasks(usertask);
            }
        }
        if (input.getUserid() != null) {
            foundUsers = _usersRepository.findById(input.getUserid()).orElse(null);

            if (foundUsers != null) {
                foundUsers.addUsertasks(usertask);
            }
        }

        Usertask createdUsertask = _usertaskRepository.save(usertask);
        return mapper.usertaskToCreateUsertaskOutput(createdUsertask);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateUsertaskOutput update(UsertaskId usertaskId, UpdateUsertaskInput input) {
        Usertask existing = _usertaskRepository
            .findById(usertaskId)
            .orElseThrow(() -> new EntityNotFoundException("Usertask not found"));

        Usertask usertask = mapper.updateUsertaskInputToUsertask(input);
        Task foundTask = null;
        Users foundUsers = null;

        if (input.getTaskid() != null) {
            foundTask = _taskRepository.findById(input.getTaskid()).orElse(null);

            if (foundTask != null) {
                foundTask.addUsertasks(usertask);
            }
        }

        if (input.getUserid() != null) {
            foundUsers = _usersRepository.findById(input.getUserid()).orElse(null);

            if (foundUsers != null) {
                foundUsers.addUsertasks(usertask);
            }
        }

        Usertask updatedUsertask = _usertaskRepository.save(usertask);
        return mapper.usertaskToUpdateUsertaskOutput(updatedUsertask);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(UsertaskId usertaskId) {
        Usertask existing = _usertaskRepository
            .findById(usertaskId)
            .orElseThrow(() -> new EntityNotFoundException("Usertask not found"));

        if (existing.getTask() != null) {
            existing.getTask().removeUsertasks(existing);
        }
        if (existing.getUsers() != null) {
            existing.getUsers().removeUsertasks(existing);
        }
        if (existing != null) {
            _usertaskRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindUsertaskByIdOutput findById(UsertaskId usertaskId) {
        Usertask foundUsertask = _usertaskRepository.findById(usertaskId).orElse(null);
        if (foundUsertask == null) return null;

        return mapper.usertaskToFindUsertaskByIdOutput(foundUsertask);
    }

    //Task
    // ReST API Call - GET /usertask/1/task
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetTaskOutput getTask(UsertaskId usertaskId) {
        Usertask foundUsertask = _usertaskRepository.findById(usertaskId).orElse(null);
        if (foundUsertask == null) {
            logHelper.getLogger().error("There does not exist a usertask wth a id='{}'", usertaskId);
            return null;
        }
        Task re = foundUsertask.getTask();
        return mapper.taskToGetTaskOutput(re, foundUsertask);
    }

    //Users
    // ReST API Call - GET /usertask/1/users
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetUsersOutput getUsers(UsertaskId usertaskId) {
        Usertask foundUsertask = _usertaskRepository.findById(usertaskId).orElse(null);
        if (foundUsertask == null) {
            logHelper.getLogger().error("There does not exist a usertask wth a id='{}'", usertaskId);
            return null;
        }
        Users re = foundUsertask.getUsers();
        return mapper.usersToGetUsersOutput(re, foundUsertask);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindUsertaskByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException {
        Page<Usertask> foundUsertask = _usertaskRepository.findAll(search(search), pageable);
        List<Usertask> usertaskList = foundUsertask.getContent();
        Iterator<Usertask> usertaskIterator = usertaskList.iterator();
        List<FindUsertaskByIdOutput> output = new ArrayList<>();

        while (usertaskIterator.hasNext()) {
            Usertask usertask = usertaskIterator.next();
            output.add(mapper.usertaskToFindUsertaskByIdOutput(usertask));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QUsertask usertask = QUsertask.usertaskEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(usertask, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("task") ||
                    list.get(i).replace("%20", "").trim().equals("users") ||
                    list.get(i).replace("%20", "").trim().equals("taskid") ||
                    list.get(i).replace("%20", "").trim().equals("userid")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QUsertask usertask,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("taskid")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(usertask.taskid.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.taskid.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.taskid.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            usertask.taskid.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(usertask.taskid.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(usertask.taskid.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("userid")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(usertask.userid.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.userid.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.userid.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            usertask.userid.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(usertask.userid.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(usertask.userid.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }

            if (details.getKey().replace("%20", "").trim().equals("task")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.task.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.task.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.task.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            usertask.task.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(usertask.task.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(usertask.task.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("users")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.users.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.users.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(usertask.users.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            usertask.users.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(usertask.users.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(usertask.users.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
        }

        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("taskid")) {
                builder.and(usertask.task.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("task")) {
                builder.and(usertask.task.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("userid")) {
                builder.and(usertask.users.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("users")) {
                builder.and(usertask.users.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        return builder;
    }

    public UsertaskId parseUsertaskKey(String keysString) {
        String[] keyEntries = keysString.split(",");
        UsertaskId usertaskId = new UsertaskId();

        Map<String, String> keyMap = new HashMap<String, String>();
        if (keyEntries.length > 1) {
            for (String keyEntry : keyEntries) {
                String[] keyEntryArr = keyEntry.split("=");
                if (keyEntryArr.length > 1) {
                    keyMap.put(keyEntryArr[0], keyEntryArr[1]);
                } else {
                    return null;
                }
            }
        } else {
            String[] keyEntryArr = keysString.split("=");
            if (keyEntryArr.length > 1) {
                keyMap.put(keyEntryArr[0], keyEntryArr[1]);
            } else {
                return null;
            }
        }

        usertaskId.setTaskid(Long.valueOf(keyMap.get("taskid")));
        usertaskId.setUserid(Long.valueOf(keyMap.get("userid")));
        return usertaskId;
    }
}
