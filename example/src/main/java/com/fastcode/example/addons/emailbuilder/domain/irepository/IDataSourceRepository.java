package com.fastcode.example.addons.emailbuilder.domain.irepository;

import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "dataSource", path = "dataSource")
public interface IDataSourceRepository
    extends JpaRepository<DataSourceEntity, Long>, QuerydslPredicateExecutor<DataSourceEntity> {
    @Query("select e from DataSourceEntity e where e.id = ?1")
    DataSourceEntity findById(long id);

    @Query("select e from DataSourceEntity e where e.name = ?1")
    DataSourceEntity findByName(String value);

    List<DataSourceEntity> findByEmailTemplateId(Long emailTemplateId);

    boolean existsByEmailTemplateId(Long id);

    @Query(value = "select e.name from  DataSourceEntity e where e.emailTemplate.id = ?1")
    List<String> getDataSourceNameByEmailTemplateId(Long id);
}
