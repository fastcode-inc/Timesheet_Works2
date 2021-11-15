package com.fastcode.example.addons.emailbuilder.domain.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "data_source_meta")
public class DataSourceMetaEntity {

    private Long id;

    private String metaColumn;

    private String metaColumnDataType;

    private DataSourceEntity dataSourceEntity;

    public DataSourceMetaEntity() {}

    public DataSourceMetaEntity(Long dataSourceMetaId) {
        this.id = dataSourceMetaId;
    }

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "meta_column", nullable = false, length = 256)
    public String getMetaColumn() {
        return metaColumn;
    }

    public void setMetaColumn(String metaColumn) {
        this.metaColumn = metaColumn;
    }

    @Basic
    @Column(name = "meta_column_data_type", nullable = false, length = 256)
    public String getMetaColumnDataType() {
        return metaColumnDataType;
    }

    public void setMetaColumnDataType(String metaColumnDataType) {
        this.metaColumnDataType = metaColumnDataType;
    }

    @ManyToOne
    @JoinColumn(name = "data_source_entity")
    public DataSourceEntity getDataSourceEntity() {
        return dataSourceEntity;
    }

    public void setDataSourceEntity(DataSourceEntity dataSourceEntity) {
        this.dataSourceEntity = dataSourceEntity;
    }
}
