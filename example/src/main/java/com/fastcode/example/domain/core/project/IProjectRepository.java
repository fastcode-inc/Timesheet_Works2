package com.fastcode.example.domain.core.project;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("projectRepository")
public interface IProjectRepository extends JpaRepository<Project, Long>, QuerydslPredicateExecutor<Project> {}
