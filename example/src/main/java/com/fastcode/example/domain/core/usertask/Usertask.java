package com.fastcode.example.domain.core.usertask;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.task.Task;
import com.querydsl.core.annotations.Config;
import java.time.*;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "usertaskEntity")
@Table(name = "usertask")
@IdClass(UsertaskId.class)
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Usertask extends AbstractEntity {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "taskid", nullable = false)
    private Long taskid;

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "userid", nullable = false)
    private Long userid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taskid", insertable = false, updatable = false)
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    private Users users;
}
