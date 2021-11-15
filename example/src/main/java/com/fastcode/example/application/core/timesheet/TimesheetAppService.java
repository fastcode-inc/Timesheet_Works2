package com.fastcode.example.application.core.timesheet;

import com.fastcode.example.application.core.timesheet.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.QTimesheet;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetstatus.ITimesheetstatusRepository;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
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

@Service("timesheetAppService")
@RequiredArgsConstructor
public class TimesheetAppService implements ITimesheetAppService {

    @Qualifier("timesheetRepository")
    @NonNull
    protected final ITimesheetRepository _timesheetRepository;

    @Qualifier("timesheetstatusRepository")
    @NonNull
    protected final ITimesheetstatusRepository _timesheetstatusRepository;

    @Qualifier("usersRepository")
    @NonNull
    protected final IUsersRepository _usersRepository;

    @Qualifier("ITimesheetMapperImpl")
    @NonNull
    protected final ITimesheetMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateTimesheetOutput create(CreateTimesheetInput input) {
        Timesheet timesheet = mapper.createTimesheetInputToTimesheet(input);
        Timesheetstatus foundTimesheetstatus = null;
        Users foundUsers = null;
        if (input.getTimesheetstatusid() != null) {
            foundTimesheetstatus = _timesheetstatusRepository.findById(input.getTimesheetstatusid()).orElse(null);

            if (foundTimesheetstatus != null) {
                foundTimesheetstatus.addTimesheets(timesheet);
            } else {
                return null;
            }
        } else {
            return null;
        }
        if (input.getUserid() != null) {
            foundUsers = _usersRepository.findById(input.getUserid()).orElse(null);

            if (foundUsers != null) {
                foundUsers.addTimesheets(timesheet);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Timesheet createdTimesheet = _timesheetRepository.save(timesheet);
        return mapper.timesheetToCreateTimesheetOutput(createdTimesheet);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateTimesheetOutput update(Long timesheetId, UpdateTimesheetInput input) {
        Timesheet existing = _timesheetRepository
            .findById(timesheetId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheet not found"));

        Timesheet timesheet = mapper.updateTimesheetInputToTimesheet(input);
        timesheet.setTimesheetdetailsSet(existing.getTimesheetdetailsSet());
        Timesheetstatus foundTimesheetstatus = null;
        Users foundUsers = null;

        if (input.getTimesheetstatusid() != null) {
            foundTimesheetstatus = _timesheetstatusRepository.findById(input.getTimesheetstatusid()).orElse(null);

            if (foundTimesheetstatus != null) {
                foundTimesheetstatus.addTimesheets(timesheet);
            } else {
                return null;
            }
        } else {
            return null;
        }

        if (input.getUserid() != null) {
            foundUsers = _usersRepository.findById(input.getUserid()).orElse(null);

            if (foundUsers != null) {
                foundUsers.addTimesheets(timesheet);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Timesheet updatedTimesheet = _timesheetRepository.save(timesheet);
        return mapper.timesheetToUpdateTimesheetOutput(updatedTimesheet);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long timesheetId) {
        Timesheet existing = _timesheetRepository
            .findById(timesheetId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheet not found"));

        if (existing.getTimesheetstatus() != null) {
            existing.getTimesheetstatus().removeTimesheets(existing);
        }
        if (existing.getUsers() != null) {
            existing.getUsers().removeTimesheets(existing);
        }
        if (existing != null) {
            _timesheetRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindTimesheetByIdOutput findById(Long timesheetId) {
        Timesheet foundTimesheet = _timesheetRepository.findById(timesheetId).orElse(null);
        if (foundTimesheet == null) return null;

        return mapper.timesheetToFindTimesheetByIdOutput(foundTimesheet);
    }

    //Timesheetstatus
    // ReST API Call - GET /timesheet/1/timesheetstatus
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetTimesheetstatusOutput getTimesheetstatus(Long timesheetId) {
        Timesheet foundTimesheet = _timesheetRepository.findById(timesheetId).orElse(null);
        if (foundTimesheet == null) {
            logHelper.getLogger().error("There does not exist a timesheet wth a id='{}'", timesheetId);
            return null;
        }
        Timesheetstatus re = foundTimesheet.getTimesheetstatus();
        return mapper.timesheetstatusToGetTimesheetstatusOutput(re, foundTimesheet);
    }

    //Users
    // ReST API Call - GET /timesheet/1/users
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetUsersOutput getUsers(Long timesheetId) {
        Timesheet foundTimesheet = _timesheetRepository.findById(timesheetId).orElse(null);
        if (foundTimesheet == null) {
            logHelper.getLogger().error("There does not exist a timesheet wth a id='{}'", timesheetId);
            return null;
        }
        Users re = foundTimesheet.getUsers();
        return mapper.usersToGetUsersOutput(re, foundTimesheet);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindTimesheetByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException {
        Page<Timesheet> foundTimesheet = _timesheetRepository.findAll(search(search), pageable);
        List<Timesheet> timesheetList = foundTimesheet.getContent();
        Iterator<Timesheet> timesheetIterator = timesheetList.iterator();
        List<FindTimesheetByIdOutput> output = new ArrayList<>();

        while (timesheetIterator.hasNext()) {
            Timesheet timesheet = timesheetIterator.next();
            output.add(mapper.timesheetToFindTimesheetByIdOutput(timesheet));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QTimesheet timesheet = QTimesheet.timesheetEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(timesheet, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("timesheetstatus") ||
                    list.get(i).replace("%20", "").trim().equals("timesheetstatusid") ||
                    list.get(i).replace("%20", "").trim().equals("users") ||
                    list.get(i).replace("%20", "").trim().equals("userid") ||
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("notes") ||
                    list.get(i).replace("%20", "").trim().equals("periodendingdate") ||
                    list.get(i).replace("%20", "").trim().equals("periodstartingdate")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QTimesheet timesheet,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timesheet.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheet.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timesheet.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timesheet.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("notes")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timesheet.notes.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(timesheet.notes.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(timesheet.notes.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("periodendingdate")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheet.periodendingdate.eq(
                            SearchUtils.stringToLocalDate(details.getValue().getSearchValue())
                        )
                    );
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheet.periodendingdate.ne(
                            SearchUtils.stringToLocalDate(details.getValue().getSearchValue())
                        )
                    );
                } else if (details.getValue().getOperator().equals("range")) {
                    LocalDate startLocalDate = SearchUtils.stringToLocalDate(details.getValue().getStartingValue());
                    LocalDate endLocalDate = SearchUtils.stringToLocalDate(details.getValue().getEndingValue());
                    if (startLocalDate != null && endLocalDate != null) {
                        builder.and(timesheet.periodendingdate.between(startLocalDate, endLocalDate));
                    } else if (endLocalDate != null) {
                        builder.and(timesheet.periodendingdate.loe(endLocalDate));
                    } else if (startLocalDate != null) {
                        builder.and(timesheet.periodendingdate.goe(startLocalDate));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("periodstartingdate")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheet.periodstartingdate.eq(
                            SearchUtils.stringToLocalDate(details.getValue().getSearchValue())
                        )
                    );
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheet.periodstartingdate.ne(
                            SearchUtils.stringToLocalDate(details.getValue().getSearchValue())
                        )
                    );
                } else if (details.getValue().getOperator().equals("range")) {
                    LocalDate startLocalDate = SearchUtils.stringToLocalDate(details.getValue().getStartingValue());
                    LocalDate endLocalDate = SearchUtils.stringToLocalDate(details.getValue().getEndingValue());
                    if (startLocalDate != null && endLocalDate != null) {
                        builder.and(timesheet.periodstartingdate.between(startLocalDate, endLocalDate));
                    } else if (endLocalDate != null) {
                        builder.and(timesheet.periodstartingdate.loe(endLocalDate));
                    } else if (startLocalDate != null) {
                        builder.and(timesheet.periodstartingdate.goe(startLocalDate));
                    }
                }
            }

            if (details.getKey().replace("%20", "").trim().equals("timesheetstatus")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.timesheetstatus.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.timesheetstatus.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.timesheetstatus.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheet.timesheetstatus.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(
                            timesheet.timesheetstatus.id.goe(Long.valueOf(details.getValue().getStartingValue()))
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(
                            timesheet.timesheetstatus.id.loe(Long.valueOf(details.getValue().getEndingValue()))
                        );
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("users")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.users.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.users.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheet.users.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheet.users.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timesheet.users.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timesheet.users.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
        }

        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("timesheetstatusid")) {
                builder.and(timesheet.timesheetstatus.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("timesheetstatus")) {
                builder.and(timesheet.timesheetstatus.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("userid")) {
                builder.and(timesheet.users.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("users")) {
                builder.and(timesheet.users.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        return builder;
    }

    public Map<String, String> parseTimesheetdetailsJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("timesheetid", keysString);

        return joinColumnMap;
    }
}
