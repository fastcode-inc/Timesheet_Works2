package com.fastcode.example.addons.emailbuilder.domain.datasource;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.DataSourceMetaInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.domain.irepository.DataSourceMetaEntityRepo;
import com.fastcode.example.addons.emailbuilder.domain.irepository.EmailMergeFieldEntityRepo;
import com.fastcode.example.addons.emailbuilder.domain.irepository.IDataSourceRepository;
import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailTemplateMappingRepo;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceMetaEntity;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
public class DataSourceManager implements IDataSourceManager {

    @Autowired
    IDataSourceRepository _dataSourceRepository;

    @Autowired
    private DataSourceMetaEntityRepo dataSourceMetaEntityRepo;

    @Autowired
    private IEmailTemplateMappingRepo emailTemplateMappingRepo;

    @Autowired
    private EmailMergeFieldEntityRepo emailMergeFieldEntityRepo;

    public DataSourceEntity create(DataSourceEntity email) {
        return _dataSourceRepository.save(email);
    }

    @Override
    public boolean existsByEmailTemplateId(Long id) {
        return _dataSourceRepository.existsByEmailTemplateId(id);
    }

    public boolean delete(DataSourceEntity email) {
        if (!emailTemplateMappingRepo.existsByDataSourceEntiry(email)) {
            dataSourceMetaEntityRepo.deleteAllMeta(email);
            _dataSourceRepository.delete(email);
            return false;
        } else {
            return true;
        }
    }

    public DataSourceEntity update(DataSourceEntity email) {
        return _dataSourceRepository.save(email);
    }

    public DataSourceEntity findById(Long emailId) {
        return _dataSourceRepository.findById(emailId.longValue());
    }

    public DataSourceEntity findByName(String name) {
        return _dataSourceRepository.findByName(name);
    }

    public Page<DataSourceEntity> findAll(Predicate predicate, Pageable pageable) {
        return _dataSourceRepository.findAll(predicate, pageable);
    }

    @Override
    public List<DataSourceEntity> findAll() {
        Sort sort1 = Sort.by("propertyName");
        Sort sort2 = Sort.by("mergeType");
        Sort groupSort = sort1.and(sort2);
        return _dataSourceRepository.findAll(groupSort);
    }

    @Override
    public DataSourceEntity update(Long eid, UpdateDataSourceInput dataSource) {
        Optional<DataSourceEntity> previousOpt = _dataSourceRepository.findById(eid);
        if (previousOpt.isPresent()) {
            DataSourceEntity previos = previousOpt.get();
            previos.setEmailTemplate(dataSource.getEmailTemplate());
            previos.setSqlQuery(dataSource.getSqlQuery());
            previos = _dataSourceRepository.save(previos);

            if (!dataSource.isReadOnlyQuery()) {
                dataSourceMetaEntityRepo.deleteAllMeta(previos);
                List<DataSourceMetaInput> allMetaInputs = dataSource.getDataSourceMetaList();
                List<DataSourceMetaEntity> allSourceEntity = new ArrayList<>();
                if (allMetaInputs != null && !allMetaInputs.isEmpty()) {
                    for (DataSourceMetaInput metaInput : allMetaInputs) {
                        DataSourceMetaEntity dataEntity = new DataSourceMetaEntity();
                        dataEntity.setDataSourceEntity(previos);
                        dataEntity.setMetaColumn(metaInput.getMetaColumn());
                        dataEntity.setMetaColumnDataType(metaInput.getMetaColumnDataType());
                        allSourceEntity.add(dataEntity);
                    }
                    dataSourceMetaEntityRepo.saveAll(allSourceEntity);
                }
            }
            return previos;
        }
        return null;
    }

    @Override
    public String getAllMappedMergeField(Long id) {
        List<String> mappedList = emailTemplateMappingRepo.getAllMappedEmailTemplate(id);
        if (mappedList != null && mappedList.size() > 0) {
            return String.join(",", mappedList);
        } else {
            return "NORECORD";
        }
    }

    @Override
    public String getAllMappedForEmailTemplate(Long id) {
        List<String> mappedList = emailMergeFieldEntityRepo.getPropertyNames(id);
        if (mappedList != null && mappedList.size() > 0) {
            return String.join(",", mappedList);
        } else {
            return "NORECORD";
        }
    }

    @Override
    public String getAlreadyMappedDatasourceForEmailTemplate(Long id) {
        List<String> mappedList = _dataSourceRepository.getDataSourceNameByEmailTemplateId(id);
        if (mappedList != null && mappedList.size() > 0) {
            return String.join(",", mappedList);
        } else {
            return "NORECORD";
        }
    }
}
