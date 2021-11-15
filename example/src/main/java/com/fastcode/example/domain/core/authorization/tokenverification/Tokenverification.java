package com.fastcode.example.domain.core.authorization.tokenverification;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.querydsl.core.annotations.Config;
import java.time.*;
import java.util.Date;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "tokenverificationEntity")
@Table(name = "tokenverification")
@IdClass(TokenverificationId.class)
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Tokenverification extends AbstractEntity {

    @Basic
    @Column(name = "expiration_time", nullable = true)
    private Date expirationTime;

    @Basic
    @Column(name = "token", nullable = true, length = 512)
    private String token;

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "token_type", nullable = false, length = 256)
    private String tokenType;

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "users_id", nullable = false)
    private Long usersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", insertable = false, updatable = false)
    private Users users;
}
