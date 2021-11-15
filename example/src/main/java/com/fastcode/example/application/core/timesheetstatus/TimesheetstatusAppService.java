package com.fastcode.example.application.core.timesheetstatus;

import com.fastcode.example.application.core.timesheetstatus.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.timesheetstatus.ITimesheetstatusRepository;
import com.fastcode.example.domain.core.timesheetstatus.QTimesheetstatus;
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

@Service("timesheetstatusAppService")
@RequiredArgsConstructor
public class TimesheetstatusAppService implements ITimesheetstatusAppService {

    @Qualifier("timesheetstatusRepository")
    @NonNull
    protected final ITimesheetstatusRepository _timesheetstatusRepository;

    @Qualifier("ITimesheetstatusMapperImpl")
    @NonNull
    protected final ITimesheetstatusMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateTimesheetstatusOutput create(CreateTimesheetstatusInput input) {
        Timesheetstatus timesheetstatus = mapper.createTimesheetstatusInputToTimesheetstatus(input);

        Timesheetstatus createdTimesheetstatus = _timesheetstatusRepository.save(timesheetstatus);
        return mapper.timesheetstatusToCreateTimesheetstatusOutput(createdTimesheetstatus);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateTimesheetstatusOutput update(Long timesheetstatusId, UpdateTimesheetstatusInput input) {
        Timesheetstatus existing = _timesheetstatusRepository
            .findById(timesheetstatusId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheetstatus not found"));

        Timesheetstatus timesheetstatus = mapper.updateTimesheetstatusInputToTimesheetstatus(input);
        timesheetstatus.setTimesheetsSet(existing.getTimesheetsSet());

        Timesheetstatus updatedTimesheetstatus = _timesheetstatusRepository.save(timesheetstatus);
        return mapper.timesheetstatusToUpdateTimesheetstatusOutput(updatedTimesheetstatus);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long timesheetstatusId) {
        Timesheetstatus existing = _timesheetstatusRepository
            .findById(timesheetstatusId)
            .orElseThrow(() -> new EntityNotFoundException("Timesheetstatus not found"));

        if (existing != null) {
            _timesheetstatusRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindTimesheetstatusByIdOutput findById(Long timesheetstatusId) {
        Timesheetstatus foundTimesheetstatus = _timesheetstatusRepository.findById(timesheetstatusId).orElse(null);
        if (foundTimesheetstatus == null) return null;

        return mapper.timesheetstatusToFindTimesheetstatusByIdOutput(foundTimesheetstatus);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindTimesheetstatusByIdOutput> find(SearchCriteria search, Pageable pageable)
        throws MalformedURLException {
        Page<Timesheetstatus> foundTimesheetstatus = _timesheetstatusRepository.findAll(search(search), pageable);
        List<Timesheetstatus> timesheetstatusList = foundTimesheetstatus.getContent();
        Iterator<Timesheetstatus> timesheetstatusIterator = timesheetstatusList.iterator();
        List<FindTimesheetstatusByIdOutput> output = new ArrayList<>();

        while (timesheetstatusIterator.hasNext()) {
            Timesheetstatus timesheetstatus = timesheetstatusIterator.next();
            output.add(mapper.timesheetstatusToFindTimesheetstatusByIdOutput(timesheetstatus));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QTimesheetstatus timesheetstatus = QTimesheetstatus.timesheetstatusEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(timesheetstatus, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("statusname")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QTimesheetstatus timesheetstatus,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timesheetstatus.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetstatus.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timesheetstatus.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timesheetstatus.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timesheetstatus.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timesheetstatus.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("statusname")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(
                        timesheetstatus.statusname.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%")
                    );
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(timesheetstatus.statusname.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(timesheetstatus.statusname.ne(details.getValue().getSearchValue()));
                }
            }
        }

        return builder;
    }

    public Map<String, String> parseTimesheetsJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("timesheetstatusid", keysString);

        return joinColumnMap;
    }
}
