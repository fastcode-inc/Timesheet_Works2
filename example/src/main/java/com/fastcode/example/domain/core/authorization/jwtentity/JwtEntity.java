package com.fastcode.example.domain.core.authorization.jwtentity;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.querydsl.core.annotations.Config;
import java.time.*;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "jwtEntityEntity")
@Table(name = "jwt_entity")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class JwtEntity extends AbstractEntity {

    @Basic
    @Column(name = "authentication_token", nullable = true)
    private String authenticationToken;

    @Basic
    @Column(name = "authorization_token", nullable = false)
    private String authorizationToken;

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "user_name", nullable = false, length = 32)
    private String userName;
}
