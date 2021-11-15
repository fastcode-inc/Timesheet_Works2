package com.fastcode.example.domain.core.authorization.userspermission;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("userspermissionRepository")
public interface IUserspermissionRepository
    extends JpaRepository<Userspermission, UserspermissionId>, QuerydslPredicateExecutor<Userspermission> {
    List<Userspermission> findByUsersId(Long usersId);
}
