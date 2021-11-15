package com.fastcode.example.domain.core.authorization.permission;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.rolepermission.Rolepermission;
import com.fastcode.example.domain.core.authorization.userspermission.Userspermission;
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
@Config(defaultVariableName = "permissionEntity")
@Table(name = "permission")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Permission extends AbstractEntity {

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

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Rolepermission> rolepermissionsSet = new HashSet<Rolepermission>();

    public void addRolepermissions(Rolepermission rolepermissions) {
        rolepermissionsSet.add(rolepermissions);

        rolepermissions.setPermission(this);
    }

    public void removeRolepermissions(Rolepermission rolepermissions) {
        rolepermissionsSet.remove(rolepermissions);

        rolepermissions.setPermission(null);
    }

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Userspermission> userspermissionsSet = new HashSet<Userspermission>();

    public void addUserspermissions(Userspermission userspermissions) {
        userspermissionsSet.add(userspermissions);

        userspermissions.setPermission(this);
    }

    public void removeUserspermissions(Userspermission userspermissions) {
        userspermissionsSet.remove(userspermissions);

        userspermissions.setPermission(null);
    }
}
