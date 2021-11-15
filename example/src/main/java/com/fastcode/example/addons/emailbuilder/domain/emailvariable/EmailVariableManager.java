package com.fastcode.example.addons.emailbuilder.domain.emailvariable;

import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailVariableRepository;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableEntity;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
public class EmailVariableManager implements IEmailVariableManager {

    @Autowired
    IEmailVariableRepository _emailVariableRepository;

    public EmailVariableEntity create(EmailVariableEntity email) {
        return _emailVariableRepository.save(email);
    }

    public void delete(EmailVariableEntity email) {
        _emailVariableRepository.delete(email);
    }

    public EmailVariableEntity update(EmailVariableEntity email) {
        return _emailVariableRepository.save(email);
    }

    public EmailVariableEntity findById(Long emailId) {
        return _emailVariableRepository.findById(emailId.longValue());
    }

    public EmailVariableEntity findByName(String name) {
        return _emailVariableRepository.findByEmailName(name);
    }

    public Page<EmailVariableEntity> findAll(Predicate predicate, Pageable pageable) {
        return _emailVariableRepository.findAll(predicate, pageable);
    }

    @Override
    public List<EmailVariableEntity> findAll() {
        Sort sort1 = Sort.by("propertyName");
        Sort sort2 = Sort.by("mergeType");
        Sort groupSort = sort1.and(sort2);
        return _emailVariableRepository.findAll(groupSort);
    }

    @Override
    public List<Long> findByNameIn(Set<String> allFieldsId) {
        return _emailVariableRepository.findByNameIn(allFieldsId);
    }

    @Override
    public List<EmailVariableEntity> findByPropertyType(String type) {
        return _emailVariableRepository.findByPropertyType(type);
    }

    @Override
    public List<EmailVariableEntity> findByPropertyTypeIn(List<String> types) {
        return _emailVariableRepository.findByPropertyTypeIn(types);
    }
}
