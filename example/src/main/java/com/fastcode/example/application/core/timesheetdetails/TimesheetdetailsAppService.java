package com.fastcode.example.application.core.timesheetdetails;

import com.fastcode.example.application.core.timesheetdetails.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.task.ITaskRepository;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.timeofftype.ITimeofftypeRepository;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.core.timesheet.ITimesheetRepository;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.fastcode.example.domain.core.timesheetdetails.ITimesheetdetailsRepository;
import com.fastcode.example.domain.core.timesheetdetails.QTimesheetdetails;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import com.querydsl.core.BooleanBuilder;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.time.*;
import java.util.*;
import javax.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("timesheetdetailsAppService")
@RequiredArgsConstructor
public class TimesheetdetailsAppService implements ITimesheetdetailsAppService {

    @Qualifier("timesheetdetailsRepository")
    @NonNull
    protected final ITimesheetdetailsRepository _timesheetdetailsRepository;

    @Qualifier("taskRepository")
    @NonNull
    protected final ITaskRepository _taskRepository;

    @Qualifier("timeofftypeRepository")
    @NonNull
    protected final ITimeofftypeRepository _timeofftypeRepository;

    @Qualifier("timesheetRepository")
    @NonNull
    protected final ITimesheetRepository _timesheetRepository;

    @Qualifier("ITimesheetdetailsMapperImpl")
    @NonNull
    protected final ITimesheetdetailsMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateTimesheetdetailsOutput create(CreateTimesheetdetailsInput input) {
        Timesheetdetails timesheetdetails = mapper.createTimesheetdetailsInputToTimesheetdetails(input);
        Task foundTask = null;
        Timeofftype foundTimeofftype = null;
        Timesheet foundTimesheet = null;
        if (input.getTaskid() != null) {
            foundTask = _taskRepository.findById(input.getTaskid()).orElse(null);

            if (foundTask != null) {
                foundTask.addTimesheetdetails(timesheetdetails);
            }
        }
        if (input.getTimeofftypeid() != null) {
            foundTimeofftype = _timeofftypeRepository.findById(input.getTimeofftypeid()).orElse(null);

            if (foundTimeofftype != null) {
                foundTimeofftype.addTimesheetdetails(timesheetdetails);
            }
        }
        if (input.getTimesheetid() != null) {
            foundTimesheet = _timesheetRepository.findById(input.getTimesheetid()).orElse(null);

            if (foundTimesheet != null) {
                foundTimesheet.addTimesheetdetails(timesheetdetails);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Timesheetdetails createdTimesheetdetails = _timesheetdetailsRepository.save(timesheetdetails);
        return mapper.timesheetdetailsToCreateTimesheetdetailsOutput(createdTimesheetdetails);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateTimesheetdetailsOutput update(Long timesheetdetailsId, UpdateTimesheetdetailsInput input) {
        Timesheetdetails existing = _timesheetdetailsRepository
            .findById(timesheetdetailsId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheetdetails not found"));

        Timesheetdetails timesheetdetails = mapper.updateTimesheetdetailsInputToTimesheetdetails(input);
        Task foundTask = null;
        Timeofftype foundTimeofftype = null;
        Timesheet foundTimesheet = null;

        if (input.getTaskid() != null) {
            foundTask = _taskRepository.findById(input.getTaskid()).orElse(null);

            if (foundTask != null) {
                foundTask.addTimesheetdetails(timesheetdetails);
            }
        }

        if (input.getTimeofftypeid() != null) {
            foundTimeofftype = _timeofftypeRepository.findById(input.getTimeofftypeid()).orElse(null);

            if (foundTimeofftype != null) {
                foundTimeofftype.addTimesheetdetails(timesheetdetails);
            }
        }

        if (input.getTimesheetid() != null) {
            foundTimesheet = _timesheetRepository.findById(input.getTimesheetid()).orElse(null);

            if (foundTimesheet != null) {
                foundTimesheet.addTimesheetdetails(timesheetdetails);
            } else {
                return null;
            }
        } else {
            return null;
        }

        Timesheetdetails updatedTimesheetdetails = _timesheetdetailsRepository.save(timesheetdetails);
        return mapper.timesheetdetailsToUpdateTimesheetdetailsOutput(updatedTimesheetdetails);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long timesheetdetailsId) {
        Timesheetdetails existing = _timesheetdetailsRepository
            .findById(timesheetdetailsId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheetdetails not found"));

        if (existing.getTask() != null) {
            existing.getTask().removeTimesheetdetails(existing);
        }
        if (existing.getTimeofftype() != null) {
            existing.getTimeofftype().removeTimesheetdetails(existing);
        }
        if (existing.getTimesheet() != null) {
            existing.getTimesheet().removeTimesheetdetails(existing);
        }
        if (existing != null) {
            _timesheetdetailsRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindTimesheetdetailsByIdOutput findById(Long timesheetdetailsId) {
        Timesheetdetails foundTimesheetdetails = _timesheetdetailsRepository.findById(timesheetdetailsId).orElse(null);
        if (foundTimesheetdetails == null) return null;

        return mapper.timesheetdetailsToFindTimesheetdetailsByIdOutput(foundTimesheetdetails);
    }

    //Task
    // ReST API Call - GET /timesheetdetails/1/task
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetTaskOutput getTask(Long timesheetdetailsId) {
        Timesheetdetails foundTimesheetdetails = _timesheetdetailsRepository.findById(timesheetdetailsId).orElse(null);
        if (foundTimesheetdetails == null) {
            logHelper.getLogger().error("There does not exist a timesheetdetails wth a id='{}'", timesheetdetailsId);
            return null;
        }
        Task re = foundTimesheetdetails.getTask();
        return mapper.taskToGetTaskOutput(re, foundTimesheetdetails);
    }

    //Timeofftype
    // ReST API Call - GET /timesheetdetails/1/timeofftype
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetTimeofftypeOutput getTimeofftype(Long timesheetdetailsId) {
        Timesheetdetails foundTimesheetdetails = _timesheetdetailsRepository.findById(timesheetdetailsId).orElse(null);
        if (foundTimesheetdetails == null) {
            logHelper.getLogger().error("There does not exist a timesheetdetails wth a id='{}'", timesheetdetailsId);
            return null;
        }
        Timeofftype re = foundTimesheetdetails.getTimeofftype();
        return mapper.timeofftypeToGetTimeofftypeOutput(re, foundTimesheetdetails);
    }

    //Timesheet
    // ReST API Call - GET /timesheetdetails/1/timesheet
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public GetTimesheetOutput getTimesheet(Long timesheetdetailsId) {
        Timesheetdetails foundTimesheetdetails = _timesheetdetailsRepository.findById(timesheetdetailsId).orElse(null);
        if (foundTimesheetdetails == null) {
            logHelper.getLogger().error("There does not exist a timesheetdetails wth a id='{}'", timesheetdetailsId);
            return null;
        }
        Timesheet re = foundTimesheetdetails.getTimesheet();
        return mapper.timesheetToGetTimesheetOutput(re, foundTimesheetdetails);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindTimesheetdetailsByIdOutput> find(SearchCriteria search, Pageable pageable)
        throws MalformedURLException {
        Page<Timesheetdetails> foundTimesheetdetails = _timesheetdetailsRepository.findAll(search(search), pageable);
        List<Timesheetdetails> timesheetdetailsList = foundTimesheetdetails.getContent();
        Iterator<Timesheetdetails> timesheetdetailsIterator = timesheetdetailsList.iterator();
        List<FindTimesheetdetailsByIdOutput> output = new ArrayList<>();

        while (timesheetdetailsIterator.hasNext()) {
            Timesheetdetails timesheetdetails = timesheetdetailsIterator.next();
            output.add(mapper.timesheetdetailsToFindTimesheetdetailsByIdOutput(timesheetdetails));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QTimesheetdetails timesheetdetails = QTimesheetdetails.timesheetdetailsEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(timesheetdetails, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("task") ||
                    list.get(i).replace("%20", "").trim().equals("taskid") ||
                    list.get(i).replace("%20", "").trim().equals("timeofftype") ||
                    list.get(i).replace("%20", "").trim().equals("timeofftypeid") ||
                    list.get(i).replace("%20", "").trim().equals("timesheet") ||
                    list.get(i).replace("%20", "").trim().equals("timesheetid") ||
                    list.get(i).replace("%20", "").trim().equals("hours") ||
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("notes") ||
                    list.get(i).replace("%20", "").trim().equals("workdate")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QTimesheetdetails timesheetdetails,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("hours")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    NumberUtils.isCreatable(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.hours.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    NumberUtils.isCreatable(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.hours.eq(new BigDecimal(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    NumberUtils.isCreatable(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.hours.ne(new BigDecimal(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        NumberUtils.isCreatable(details.getValue().getStartingValue()) &&
                        NumberUtils.isCreatable(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetdetails.hours.between(
                                new BigDecimal(details.getValue().getStartingValue()),
                                new BigDecimal(details.getValue().getEndingValue())
                            )
                        );
                    } else if (NumberUtils.isCreatable(details.getValue().getStartingValue())) {
                        builder.and(timesheetdetails.hours.goe(new BigDecimal(details.getValue().getStartingValue())));
                    } else if (NumberUtils.isCreatable(details.getValue().getEndingValue())) {
                        builder.and(timesheetdetails.hours.loe(new BigDecimal(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timesheetdetails.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetdetails.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timesheetdetails.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timesheetdetails.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("notes")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timesheetdetails.notes.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(timesheetdetails.notes.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(timesheetdetails.notes.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("workdate")) {
                if (
                    details.getValue().getOperator().equals("equals") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheetdetails.workdate.eq(SearchUtils.stringToLocalDate(details.getValue().getSearchValue()))
                    );
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    SearchUtils.stringToLocalDate(details.getValue().getSearchValue()) != null
                ) {
                    builder.and(
                        timesheetdetails.workdate.ne(SearchUtils.stringToLocalDate(details.getValue().getSearchValue()))
                    );
                } else if (details.getValue().getOperator().equals("range")) {
                    LocalDate startLocalDate = SearchUtils.stringToLocalDate(details.getValue().getStartingValue());
                    LocalDate endLocalDate = SearchUtils.stringToLocalDate(details.getValue().getEndingValue());
                    if (startLocalDate != null && endLocalDate != null) {
                        builder.and(timesheetdetails.workdate.between(startLocalDate, endLocalDate));
                    } else if (endLocalDate != null) {
                        builder.and(timesheetdetails.workdate.loe(endLocalDate));
                    } else if (startLocalDate != null) {
                        builder.and(timesheetdetails.workdate.goe(startLocalDate));
                    }
                }
            }

            if (details.getKey().replace("%20", "").trim().equals("task")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.task.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.task.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.task.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetdetails.task.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timesheetdetails.task.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timesheetdetails.task.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("timeofftype")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timeofftype.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timeofftype.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timeofftype.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetdetails.timeofftype.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(
                            timesheetdetails.timeofftype.id.goe(Long.valueOf(details.getValue().getStartingValue()))
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(
                            timesheetdetails.timeofftype.id.loe(Long.valueOf(details.getValue().getEndingValue()))
                        );
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("timesheet")) {
                if (
                    details.getValue().getOperator().equals("contains") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timesheet.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timesheet.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetdetails.timesheet.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetdetails.timesheet.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(
                            timesheetdetails.timesheet.id.goe(Long.valueOf(details.getValue().getStartingValue()))
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(
                            timesheetdetails.timesheet.id.loe(Long.valueOf(details.getValue().getEndingValue()))
                        );
                    }
                }
            }
        }

        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("taskid")) {
                builder.and(timesheetdetails.task.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("task")) {
                builder.and(timesheetdetails.task.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("timeofftypeid")) {
                builder.and(timesheetdetails.timeofftype.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("timeofftype")) {
                builder.and(timesheetdetails.timeofftype.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        for (Map.Entry<String, String> joinCol : joinColumns.entrySet()) {
            if (joinCol != null && joinCol.getKey().equals("timesheetid")) {
                builder.and(timesheetdetails.timesheet.id.eq(Long.parseLong(joinCol.getValue())));
            }

            if (joinCol != null && joinCol.getKey().equals("timesheet")) {
                builder.and(timesheetdetails.timesheet.id.eq(Long.parseLong(joinCol.getValue())));
            }
        }
        return builder;
    }
}
