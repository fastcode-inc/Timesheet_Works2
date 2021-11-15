package com.fastcode.example.domain.core.task;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("taskRepository")
public interface ITaskRepository extends JpaRepository<Task, Long>, QuerydslPredicateExecutor<Task> {}
