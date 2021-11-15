package com.fastcode.example.domain.core.authorization.users;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("usersRepository")
public interface IUsersRepository extends JpaRepository<Users, Long>, QuerydslPredicateExecutor<Users> {
    @Query("select u from Users u where u.username = ?1")
    Users findByUsernameIgnoreCase(String value);

    Users findByEmailaddressIgnoreCase(String emailAddress);
}
