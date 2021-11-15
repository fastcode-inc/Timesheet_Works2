package com.fastcode.example.addons.emailbuilder.domain.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "email_variable")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class EmailVariableEntity {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(name = "property_name", nullable = false, length = 50)
    private String propertyName;

    @Basic
    @Column(name = "property_type", nullable = false, length = 50)
    private String propertyType;

    @Basic
    @Column(name = "default_value", nullable = true, length = 100)
    private String defaultValue;

    @Basic
    @Column(name = "merge_type", nullable = true, length = 50)
    private String mergeType;

    public EmailVariableEntity(String propertyName, String propertyType, String defaultValue, String mergeTye) {
        this.propertyName = propertyName;
        this.propertyType = propertyType;
        this.defaultValue = defaultValue;
        this.mergeType = mergeTye;
    }

    public EmailVariableEntity(Long id2) {
        this.id = id2;
    }
}
