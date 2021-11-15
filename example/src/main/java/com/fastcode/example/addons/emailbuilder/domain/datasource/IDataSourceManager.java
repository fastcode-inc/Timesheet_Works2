package com.fastcode.example.addons.emailbuilder.domain.datasource;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.UpdateDataSourceInput;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IDataSourceManager {
    // CRUD Operations
    public DataSourceEntity create(DataSourceEntity email);

    public boolean delete(DataSourceEntity email);

    public DataSourceEntity update(DataSourceEntity email);

    public DataSourceEntity findById(Long emailId);

    public DataSourceEntity findByName(String name);

    public Page<DataSourceEntity> findAll(Predicate predicate, Pageable pageable);

    public List<DataSourceEntity> findAll();

    public DataSourceEntity update(Long eid, UpdateDataSourceInput dataSource);

    public String getAllMappedMergeField(Long id);

    public String getAllMappedForEmailTemplate(Long id);

    public boolean existsByEmailTemplateId(Long id);

    public String getAlreadyMappedDatasourceForEmailTemplate(Long id);
}
