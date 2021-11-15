package com.fastcode.example.domain.core.authorization.rolepermission;

import java.io.Serializable;
import java.time.*;
import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RolepermissionId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long permissionId;
    private Long roleId;

    public RolepermissionId(Long permissionId, Long roleId) {
        this.permissionId = permissionId;
        this.roleId = roleId;
    }
}
