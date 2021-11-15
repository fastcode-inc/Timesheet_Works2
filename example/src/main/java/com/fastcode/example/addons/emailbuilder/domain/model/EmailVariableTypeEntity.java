package com.fastcode.example.addons.emailbuilder.domain.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "email_variable_type")
public class EmailVariableTypeEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String variableType;

    public EmailVariableTypeEntity() {}

    public EmailVariableTypeEntity(String variableType) {
        this.variableType = variableType;
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
    @Column(name = "variable_type", nullable = false, length = 50, unique = true)
    public String getVariableType() {
        return variableType;
    }

    public void setVariableType(String variableType) {
        this.variableType = variableType;
    }
}
