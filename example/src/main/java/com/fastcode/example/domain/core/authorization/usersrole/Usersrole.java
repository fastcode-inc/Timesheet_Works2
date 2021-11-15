package com.fastcode.example.domain.core.authorization.usersrole;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.role.Role;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.querydsl.core.annotations.Config;
import java.time.*;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "usersroleEntity")
@Table(name = "usersrole")
@IdClass(UsersroleId.class)
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Usersrole extends AbstractEntity {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "users_id", nullable = false)
    private Long usersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", insertable = false, updatable = false)
    private Users users;
}
