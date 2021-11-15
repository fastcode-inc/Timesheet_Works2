package com.fastcode.example.application.core.timeofftype;

import com.fastcode.example.application.core.timeofftype.dto.*;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.*;
import com.fastcode.example.domain.core.timeofftype.ITimeofftypeRepository;
import com.fastcode.example.domain.core.timeofftype.QTimeofftype;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
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

@Service("timeofftypeAppService")
@RequiredArgsConstructor
public class TimeofftypeAppService implements ITimeofftypeAppService {

    @Qualifier("timeofftypeRepository")
    @NonNull
    protected final ITimeofftypeRepository _timeofftypeRepository;

    @Qualifier("ITimeofftypeMapperImpl")
    @NonNull
    protected final ITimeofftypeMapper mapper;

    @NonNull
    protected final LoggingHelper logHelper;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateTimeofftypeOutput create(CreateTimeofftypeInput input) {
        Timeofftype timeofftype = mapper.createTimeofftypeInputToTimeofftype(input);

        Timeofftype createdTimeofftype = _timeofftypeRepository.save(timeofftype);
        return mapper.timeofftypeToCreateTimeofftypeOutput(createdTimeofftype);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateTimeofftypeOutput update(Long timeofftypeId, UpdateTimeofftypeInput input) {
        Timeofftype existing = _timeofftypeRepository
            .findById(timeofftypeId)
            .orElseThrow(() -> new EntityNotFoundException("Timeofftype not found"));

        Timeofftype timeofftype = mapper.updateTimeofftypeInputToTimeofftype(input);
        timeofftype.setTimesheetdetailsSet(existing.getTimesheetdetailsSet());

        Timeofftype updatedTimeofftype = _timeofftypeRepository.save(timeofftype);
        return mapper.timeofftypeToUpdateTimeofftypeOutput(updatedTimeofftype);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long timeofftypeId) {
        Timeofftype existing = _timeofftypeRepository
            .findById(timeofftypeId)
            .orElseThrow(() -> new EntityNotFoundException("Timeofftype not found"));

        if (existing != null) {
            _timeofftypeRepository.delete(existing);
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public FindTimeofftypeByIdOutput findById(Long timeofftypeId) {
        Timeofftype foundTimeofftype = _timeofftypeRepository.findById(timeofftypeId).orElse(null);
        if (foundTimeofftype == null) return null;

        return mapper.timeofftypeToFindTimeofftypeByIdOutput(foundTimeofftype);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<FindTimeofftypeByIdOutput> find(SearchCriteria search, Pageable pageable) throws MalformedURLException {
        Page<Timeofftype> foundTimeofftype = _timeofftypeRepository.findAll(search(search), pageable);
        List<Timeofftype> timeofftypeList = foundTimeofftype.getContent();
        Iterator<Timeofftype> timeofftypeIterator = timeofftypeList.iterator();
        List<FindTimeofftypeByIdOutput> output = new ArrayList<>();

        while (timeofftypeIterator.hasNext()) {
            Timeofftype timeofftype = timeofftypeIterator.next();
            output.add(mapper.timeofftypeToFindTimeofftypeByIdOutput(timeofftype));
        }
        return output;
    }

    protected BooleanBuilder search(SearchCriteria search) throws MalformedURLException {
        QTimeofftype timeofftype = QTimeofftype.timeofftypeEntity;
        if (search != null) {
            Map<String, SearchFields> map = new HashMap<>();
            for (SearchFields fieldDetails : search.getFields()) {
                map.put(fieldDetails.getFieldName(), fieldDetails);
            }
            List<String> keysList = new ArrayList<String>(map.keySet());
            checkProperties(keysList);
            return searchKeyValuePair(timeofftype, map, search.getJoinColumns());
        }
        return null;
    }

    protected void checkProperties(List<String> list) throws MalformedURLException {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    list.get(i).replace("%20", "").trim().equals("id") ||
                    list.get(i).replace("%20", "").trim().equals("typename")
                )
            ) {
                throw new MalformedURLException("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    protected BooleanBuilder searchKeyValuePair(
        QTimeofftype timeofftype,
        Map<String, SearchFields> map,
        Map<String, String> joinColumns
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        Iterator<Map.Entry<String, SearchFields>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, SearchFields> details = iterator.next();

            if (details.getKey().replace("%20", "").trim().equals("id")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timeofftype.id.like(details.getValue().getSearchValue() + "%"));
                } else if (
                    details.getValue().getOperator().equals("equals") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timeofftype.id.eq(Long.valueOf(details.getValue().getSearchValue())));
                } else if (
                    details.getValue().getOperator().equals("notEqual") &&
                    StringUtils.isNumeric(details.getValue().getSearchValue())
                ) {
                    builder.and(timeofftype.id.ne(Long.valueOf(details.getValue().getSearchValue())));
                } else if (details.getValue().getOperator().equals("range")) {
                    if (
                        StringUtils.isNumeric(details.getValue().getStartingValue()) &&
                        StringUtils.isNumeric(details.getValue().getEndingValue())
                    ) {
                        builder.and(
                            timeofftype.id.between(
                                Long.valueOf(details.getValue().getStartingValue()),
                                Long.valueOf(details.getValue().getEndingValue())
                            )
                        );
                    } else if (StringUtils.isNumeric(details.getValue().getStartingValue())) {
                        builder.and(timeofftype.id.goe(Long.valueOf(details.getValue().getStartingValue())));
                    } else if (StringUtils.isNumeric(details.getValue().getEndingValue())) {
                        builder.and(timeofftype.id.loe(Long.valueOf(details.getValue().getEndingValue())));
                    }
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("typename")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(timeofftype.typename.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(timeofftype.typename.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(timeofftype.typename.ne(details.getValue().getSearchValue()));
                }
            }
        }

        return builder;
    }

    public Map<String, String> parseTimesheetdetailsJoinColumn(String keysString) {
        Map<String, String> joinColumnMap = new HashMap<String, String>();
        joinColumnMap.put("timeofftypeid", keysString);

        return joinColumnMap;
    }
}
