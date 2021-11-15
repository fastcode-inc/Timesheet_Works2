package com.fastcode.example.domain.core.authorization.role;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("roleRepository")
public interface IRoleRepository extends JpaRepository<Role, Long>, QuerydslPredicateExecutor<Role> {
    @Query("select u from Role u where u.name = ?1")
    Role findByRoleName(String value);
}
