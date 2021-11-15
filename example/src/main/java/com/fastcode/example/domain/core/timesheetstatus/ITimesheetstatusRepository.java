package com.fastcode.example.domain.core.timesheetstatus;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("timesheetstatusRepository")
public interface ITimesheetstatusRepository
    extends JpaRepository<Timesheetstatus, Long>, QuerydslPredicateExecutor<Timesheetstatus> {}
