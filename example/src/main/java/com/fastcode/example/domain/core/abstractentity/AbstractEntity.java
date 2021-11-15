package com.fastcode.example.domain.core.abstractentity;

import java.io.Serializable;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public abstract class AbstractEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Version
    @EqualsAndHashCode.Include
    @Column(name = "VERSIONO", nullable = false)
    private Long versiono;
}
