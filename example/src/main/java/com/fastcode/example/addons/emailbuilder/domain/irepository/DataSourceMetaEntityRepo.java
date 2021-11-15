package com.fastcode.example.addons.emailbuilder.domain.irepository;

import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceMetaEntity;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface DataSourceMetaEntityRepo
    extends JpaRepository<DataSourceMetaEntity, Long>, QuerydslPredicateExecutor<DataSourceEntity> {
    @Modifying
    @Transactional
    @Query("delete from DataSourceMetaEntity d where d.dataSourceEntity =?1  ")
    void deleteAllMeta(DataSourceEntity oldsourceEntity);

    @Modifying
    @Transactional
    @Query("delete from DataSourceMetaEntity d where d.dataSourceEntity in (?1)  ")
    void deleteAllMetaList(List<DataSourceEntity> oldsourceEntity);

    List<DataSourceMetaEntity> findByDataSourceEntityId(Long id);

    List<DataSourceMetaEntity> findByMetaColumnDataTypeAndDataSourceEntityIn(
        String propertyType,
        List<DataSourceEntity> dataSourceEntityList
    );

    List<DataSourceMetaEntity> findByMetaColumnDataTypeNotInAndDataSourceEntityIn(
        List<String> excludedString,
        List<DataSourceEntity> dataSourceEntityList
    );
}
