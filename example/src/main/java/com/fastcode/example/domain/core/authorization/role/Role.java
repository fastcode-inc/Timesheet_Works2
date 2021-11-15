package com.fastcode.example.domain.core.authorization.role;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.rolepermission.Rolepermission;
import com.fastcode.example.domain.core.authorization.usersrole.Usersrole;
import com.querydsl.core.annotations.Config;
import java.time.*;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "roleEntity")
@Table(name = "role")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Role extends AbstractEntity {

    @Basic
    @Column(name = "display_name", nullable = false, length = 255)
    private String displayName;

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Rolepermission> rolepermissionsSet = new HashSet<Rolepermission>();

    public void addRolepermissions(Rolepermission rolepermissions) {
        rolepermissionsSet.add(rolepermissions);

        rolepermissions.setRole(this);
    }

    public void removeRolepermissions(Rolepermission rolepermissions) {
        rolepermissionsSet.remove(rolepermissions);

        rolepermissions.setRole(null);
    }

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Usersrole> usersrolesSet = new HashSet<Usersrole>();

    public void addUsersroles(Usersrole usersroles) {
        usersrolesSet.add(usersroles);

        usersroles.setRole(this);
    }

    public void removeUsersroles(Usersrole usersroles) {
        usersrolesSet.remove(usersroles);

        usersroles.setRole(null);
    }
}
