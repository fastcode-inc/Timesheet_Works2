package com.fastcode.example.addons.emailbuilder.application.datasource;

import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.CreateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.CreateDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.DataSourceMetaInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceByIdOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.FindDataSourceByNameOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.PreviewDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.domain.datasource.IDataSourceManager;
import com.fastcode.example.addons.emailbuilder.domain.datasource.IDataSourceMetaManager;
import com.fastcode.example.addons.emailbuilder.domain.irepository.DataSourceMetaEntityRepo;
import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailTemplateMappingRepo;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceMetaEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.QDataSourceEntity;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchFields;
import com.querydsl.core.BooleanBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class DataSourceAppService {

    static final int case1 = 1;
    static final int case2 = 2;
    static final int case3 = 3;

    @Autowired
    private IDataSourceManager _dataSourceManager;

    @Autowired
    private IDataSourceMetaManager _dataSourceMetaManager;

    @Autowired
    private LoggingHelper logHelper;

    @Autowired
    private DataSourceMapper dataSourceMapper;

    @Autowired
    private IFileRepository filesRepo;

    @Autowired
    private DataSourceMetaEntityRepo dataSourceMetaEntityRepo;

    @Autowired
    private IEmailTemplateMappingRepo emailTemplateMappingRepo;

    @Transactional(propagation = Propagation.REQUIRED)
    public CreateDataSourceOutput create(CreateDataSourceInput dataSource) {
        if (_dataSourceManager.existsByEmailTemplateId(dataSource.getEmailTemplate().getId())) {
            System.out.println("Already Exist");
            return null;
        }

        DataSourceEntity sourceEntity = new DataSourceEntity();
        sourceEntity.setCreation(dataSource.getCreation());
        sourceEntity.setEmailTemplate(dataSource.getEmailTemplate());
        sourceEntity.setName(dataSource.getName());
        sourceEntity.setSqlQuery(dataSource.getSqlQuery());
        sourceEntity = _dataSourceManager.create(sourceEntity);
        List<DataSourceMetaInput> allMetaInputs = dataSource.getDataSourceMetaList();

        List<DataSourceMetaEntity> allSourceEntity = new ArrayList<>();
        if (allMetaInputs != null && !allMetaInputs.isEmpty()) {
            for (DataSourceMetaInput metaInput : allMetaInputs) {
                DataSourceMetaEntity dataEntity = new DataSourceMetaEntity();
                dataEntity.setDataSourceEntity(sourceEntity);
                dataEntity.setMetaColumn(metaInput.getMetaColumn());
                dataEntity.setMetaColumnDataType(metaInput.getMetaColumnDataType());
                allSourceEntity.add(dataEntity);
            }
            dataSourceMetaEntityRepo.saveAll(allSourceEntity);
        }
        return dataSourceMapper.dataSourceEntityToCreateDataSourceOutput(sourceEntity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean delete(Long eid) {
        DataSourceEntity existing = _dataSourceManager.findById(eid);

        return _dataSourceManager.delete(existing);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UpdateDataSourceOutput update(Long eid, UpdateDataSourceInput dataSource) {
        DataSourceEntity dse = _dataSourceManager.update(eid, dataSource);
        return dataSourceMapper.dataSourceEntityToUpdateDataSourceOutput(dse);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FindDataSourceByIdOutput findById(Long eid) {
        DataSourceEntity foundEntity = _dataSourceManager.findById(eid);
        if (foundEntity == null) {
            logHelper.getLogger().error("There does not exist a email wth a id=%s", eid);
            return null;
        }

        List<DataSourceMetaEntity> dataSourceList = dataSourceMetaEntityRepo.findByDataSourceEntityId(eid);
        List<DataSourceMetaInput> dataSourceMeta = dataSourceMapper.dataSourceMetaEntityToDataSourceMetaInput(
            dataSourceList
        );

        FindDataSourceByIdOutput result = dataSourceMapper.dataSourceEntityToFindDataSourceByIdOutput(foundEntity);
        result.setMetaList(dataSourceMeta);
        if (emailTemplateMappingRepo.existsByDataSourceEntiry(foundEntity)) {
            result.setReadOnlyQuery(true);
        }
        return result;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FindDataSourceByNameOutput findByName(String name) {
        DataSourceEntity foundEmail = _dataSourceManager.findByName(name);
        if (foundEmail == null) {
            logHelper.getLogger().error("There does not exist a email wth a name=%s", name);
            return null;
        }
        return dataSourceMapper.dataSourceEntityToFindDataSourceByNameOutput(foundEmail);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<FindDataSourceByIdOutput> find(SearchCriteria search, Pageable pageable) throws Exception {
        Page<DataSourceEntity> foundEmail = _dataSourceManager.findAll(search(search), pageable);
        List<DataSourceEntity> emailList = foundEmail.getContent();

        Iterator<DataSourceEntity> emailIterator = emailList.iterator();
        List<FindDataSourceByIdOutput> output = new ArrayList<>();

        while (emailIterator.hasNext()) {
            output.add(dataSourceMapper.dataSourceEntityToFindDataSourceByIdOutput(emailIterator.next()));
        }

        return output;
    }

    public BooleanBuilder search(SearchCriteria search) throws Exception {
        QDataSourceEntity email = QDataSourceEntity.dataSourceEntity;
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

    public BooleanBuilder searchAllProperties(QDataSourceEntity email, String value, String operator) {
        BooleanBuilder builder = new BooleanBuilder();

        if (operator.equals("contains")) {
            builder.or(email.name.likeIgnoreCase("%" + value + "%"));
            builder.or(email.sqlQuery.likeIgnoreCase("%" + value + "%"));
            builder.or(email.emailTemplate.templateName.likeIgnoreCase("%" + value + "%"));
        } else if (operator.equals("equals")) {
            builder.or(email.name.eq(value));
            builder.or(email.sqlQuery.eq(value));
            builder.or(email.emailTemplate.templateName.eq(value));
        }

        return builder;
    }

    public void checkProperties(List<String> list) throws Exception {
        for (int i = 0; i < list.size(); i++) {
            if (
                !(
                    (list.get(i).replace("%20", "").trim().equals("name")) ||
                    (list.get(i).replace("%20", "").trim().equals("sqlQuery")) ||
                    (list.get(i).replace("%20", "").trim().equals("emailTemplate"))
                )
            ) {
                // Throw an exception
                throw new Exception("Wrong URL Format: Property " + list.get(i) + " not found!");
            }
        }
    }

    public BooleanBuilder searchSpecificProperty(
        QDataSourceEntity email,
        List<String> list,
        String value,
        String operator
    ) {
        BooleanBuilder builder = new BooleanBuilder();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).replace("%20", "").trim().equals("name")) {
                if (operator.equals("contains")) {
                    builder.or(email.name.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.name.eq(value));
                }
            }
            if (list.get(i).replace("%20", "").trim().equals("sqlQuery")) {
                if (operator.equals("contains")) {
                    builder.or(email.sqlQuery.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.sqlQuery.eq(value));
                }
            }
            if (list.get(i).replace("%20", "").trim().equals("emailTemplate")) {
                if (operator.equals("contains")) {
                    builder.or(email.emailTemplate.templateName.likeIgnoreCase("%" + value + "%"));
                } else if (operator.equals("equals")) {
                    builder.or(email.emailTemplate.templateName.eq(value));
                }
            }
        }
        return builder;
    }

    public BooleanBuilder searchKeyValuePair(QDataSourceEntity email, Map<String, SearchFields> map) {
        BooleanBuilder builder = new BooleanBuilder();

        for (Map.Entry<String, SearchFields> details : map.entrySet()) {
            if (details.getKey().replace("%20", "").trim().equals("name")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(email.name.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.name.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.name.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("sqlQuery")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(email.sqlQuery.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%"));
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.sqlQuery.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.sqlQuery.ne(details.getValue().getSearchValue()));
                }
            }
            if (details.getKey().replace("%20", "").trim().equals("emailTemplate")) {
                if (details.getValue().getOperator().equals("contains")) {
                    builder.and(
                        email.emailTemplate.templateName.likeIgnoreCase("%" + details.getValue().getSearchValue() + "%")
                    );
                } else if (details.getValue().getOperator().equals("equals")) {
                    builder.and(email.emailTemplate.templateName.eq(details.getValue().getSearchValue()));
                } else if (details.getValue().getOperator().equals("notEqual")) {
                    builder.and(email.emailTemplate.templateName.ne(details.getValue().getSearchValue()));
                }
            }
        }
        return builder;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<FindDataSourceByIdOutput> findAll() {
        List<DataSourceEntity> foundEmail = _dataSourceManager.findAll();

        Iterator<DataSourceEntity> dataSourceIterator = foundEmail.iterator();
        List<FindDataSourceByIdOutput> output = new ArrayList<>();

        while (dataSourceIterator.hasNext()) {
            output.add(dataSourceMapper.dataSourceEntityToFindDataSourceByIdOutput(dataSourceIterator.next()));
        }

        return output;
    }

    public PreviewDataSourceOutput preview(String dataSource) throws JSONException {
        return _dataSourceMetaManager.getData(dataSource);
    }

    public String getAllMappedMergeField(Long id) {
        return _dataSourceManager.getAllMappedMergeField(id);
    }

    public String getAllMappedForEmailTemplate(Long id) {
        return _dataSourceManager.getAllMappedForEmailTemplate(id);
    }

    public String getAlreadyMappedDatasourceForEmailTemplate(Long id) {
        return _dataSourceManager.getAlreadyMappedDatasourceForEmailTemplate(id);
    }
}
