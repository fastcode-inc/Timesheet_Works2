package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.addons.emailbuilder.domain.emailvariable.IEmailVariableManager;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.QEmailVariableEntity;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchFields;
import com.querydsl.core.BooleanBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class EmailVariableAppService implements IEmailVariableAppService {

    static final int case1 = 1;
    static final int case2 = 2;
    static final int case3 = 3;

    @Autowired
    private IEmailVariableManager _emailVariableManager;

    @Autowired
    private LoggingHelper logHelper;

    @Autowired
    private IEmailVariableMapper emailVariableMapper;

    @Autowired
    private IFileRepository filesRepo;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateEmailVariableOutput create(CreateEmailVariableInput email) {
        EmailVariableEntity re = emailVariableMapper.createEmailVariableInputToEmailVariableEntity(email);
        EmailVariableEntity createdEmail = _emailVariableManager.create(re);

        if (createdEmail.getPropertyType().equalsIgnoreCase("Image")) {
            filesRepo.updateFileVariableTemplate(Long.parseLong(createdEmail.getDefaultValue()), createdEmail.getId());
        } else if (createdEmail.getPropertyType().equalsIgnoreCase("List of Images")) {
            String[] ids = createdEmail.getDefaultValue().split(",");
            List<Long> idsLong = new ArrayList<>();
            for (String id : ids) {
                idsLong.add(Long.parseLong(id));
            }
            filesRepo.updateFileVariableTemplateList(idsLong, createdEmail.getId());
        }
        return emailVariableMapper.emailVariableEntityToCreateEmailVariableOutput(createdEmail);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Long eid) {
        EmailVariableEntity existing = _emailVariableManager.findById(eid);
        _emailVariableManager.delete(existing);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateEmailVariableOutput update(Long eid, UpdateEmailVariableInput email) {
        EmailVariableEntity ue = emailVariableMapper.updateEmailVariableInputToEmailVariableEntity(email);
        EmailVariableEntity updatedEmail = _emailVariableManager.update(ue);

        return emailVariableMapper.emailVariableEntityToUpdateEmailVariableOutput(updatedEmail);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FindEmailVariableByIdOutput findById(Long eid) {
        EmailVariableEntity foundEmail = _emailVariableManager.findById(eid);

        if (foundEmail == null) {
            logHelper.getLogger().error("There does not exist a email wth a id=%s", eid);
            return null;
        }

        return emailVariableMapper.emailVariableEntityToFindEmailVariableByIdOutput(foundEmail);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FindEmailVariableByNameOutput findByName(String name) {
        EmailVariableEntity foundEmail = _emailVariableManager.findByName(name);
        if (foundEmail == null) {
            logHelper.getLogger().error("There does not exist a email wth a name=%s", name);
            return null;
        }
        return emailVariableMapper.emailVariableEntityToFindEmailVariableByNameOutput(foundEmail);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<FindEmailVariableByIdOutput> find(SearchCriteria search, Pageable pageable) throws Exception {
        Page<EmailVariableEntity> foundEmail = _emailVariableManager.findAll(search(search), pageable);
        List<EmailVariableEntity> emailList = foundEmail.getContent();

        Iterator<EmailVariableEntity> emailIterator = emailList.iterator();
        List<FindEmailVariableByIdOutput> output = new ArrayList<>();

        while (emailIterator.hasNext()) {
            output.add(emailVariableMapper.emailVariableEntityToFindEmailVariableByIdOutput(emailIterator.next()));
        }

        return output;
    }

    public BooleanBuilder search(SearchCriteria search) throws Exception {
        QEmailVariableEntity email = QEmailVariableEntity.emailVariableEntity;
        if (search != null) {
            if (search.getType() == case1) {
                return searchAllProperties(email, search.getValue(), search.getOperator());
            } else if (search.getType() == case2) {
                List<String> keysList = new ArrayList<String>();
                for (SearchFields f : search.getFields()) {
                    keysList.add(f.getFieldName());
                }
                checkProperties(keysList);
                return searchSpecificProperty(email, keysList, search.getValue(), search.getOperator());
            } else if (search.getType() == case3) {
                Map<String, SearchFields> map = new HashMap<>();
                for (SearchFields fieldDetails : search.getFields()) {
                    map.put(fieldDetails.getFieldName(), fieldDetails);
                }
                List<String> keysList = new ArrayList<String>(map.keySet());
                checkProperties(keysList);
                return searchKeyValuePair(email, map);
            }
        }
        return null;
    }

    public BooleanBuilder searchAllProperties(QEmailVariableEntity email, String value, String operator) {
        BooleanBuilder builder = new BooleanBuilder();

        if (operator.equals("contains")) {
            builder.or(email.propertyName.likeIgnoreCase("%" + value + "%"));
            builder.or(email.propertyType.likeIgnoreCase("%" + value + "%"));
            builder.or(email.defaultValue.likeIgnoreCase("%" + value + "%"));
        } else if (operator.equals("equals")) {
            builder.or(email.propertyName.eq(value));
            builder.or(email.propertyType.eq(value));
            builder.or(email.defaultValue.eq(value));
        }

        return builder;
    }

    public void checkProperties(List<String> list) throws Exception {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    (list.get(i).replace("%20", "").trim().equals("propertyName")) ||
                    (list.get(i).replace("%20", "").trim().equals("propertyType")) ||
                    (list.get(i).replace("%20", "").trim().equals("defaultValue"))
                )
            ) {
                // Throw an exception
                throw new Exception("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    public BooleanBuilder searchSpecificProperty(
        QEmailVariableEntity email,
        List<String> list,
        String value,
        String operator
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).replace("%20", "").trim().equals("propertyName")) {
                if (operator.equals("contains")) {
                    builder.or(email.propertyName.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.propertyName.eq(value));
                }
            }
            if (list.get(i).replace("%20", "").trim().equals("propertyType")) {
                if (operator.equals("contains")) {
                    builder.or(email.propertyType.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.propertyType.eq(value));
                }
            }
            if (list.get(i).replace("%20", "").trim().equals("defaultValue")) {
                if (operator.equals("contains")) {
                    builder.or(email.defaultValue.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.defaultValue.eq(value));
                }
            }
        }
        return builder;
    }

    public BooleanBuilder searchKeyValuePair(QEmailVariableEntity email, Map<String, SearchFields> map) {
        BooleanBuilder builder = new BooleanBuilder();

        for (Map.Entry<String, SearchFields> details : map.entrySet()) {
            if (details.getKey().replace("%20", "").trim().equals("propertyName")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(email.propertyName.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.propertyName.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.propertyName.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("propertyType")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(email.propertyType.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.propertyType.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.propertyType.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("defaultValue")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(email.defaultValue.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.defaultValue.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.defaultValue.ne(details.getValue().getSearchValue()));
                }
            }
        }
        return builder;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<FindEmailVariableByIdOutput> findAll() {
        List<EmailVariableEntity> foundVariable = _emailVariableManager.findAll();

        Iterator<EmailVariableEntity> emailIterator = foundVariable.iterator();
        List<FindEmailVariableByIdOutput> output = new ArrayList<>();

        while (emailIterator.hasNext()) {
            output.add(emailVariableMapper.emailVariableEntityToFindEmailVariableByIdOutput(emailIterator.next()));
        }

        return output;
    }

    public List<Long> findByNameIn(Set<String> allFieldsId) {
        return _emailVariableManager.findByNameIn(allFieldsId);
    }

    public List<FindEmailVariableByIdOutput> getEmailVariableByTypeOrSubject(String type) {
        List<EmailVariableEntity> foundVariable = new ArrayList<>();
        List<String> types = new ArrayList<>();
        types.add("Text");
        types.add("Date");
        types.add("Number");
        types.add("Email");
        types.add("Phone");
        types.add("Percentage");
        types.add("Currency");
        if ("Email".equalsIgnoreCase(type)) {
            foundVariable = _emailVariableManager.findByPropertyType(type);
        } else if ("Subject".equalsIgnoreCase(type)) {
            foundVariable = _emailVariableManager.findByPropertyTypeIn(types);
        }

        Iterator<EmailVariableEntity> emailIterator = foundVariable.iterator();
        List<FindEmailVariableByIdOutput> output = new ArrayList<>();

        while (emailIterator.hasNext()) {
            output.add(emailVariableMapper.emailVariableEntityToFindEmailVariableByIdOutput(emailIterator.next()));
        }

        return output;
    }
}
