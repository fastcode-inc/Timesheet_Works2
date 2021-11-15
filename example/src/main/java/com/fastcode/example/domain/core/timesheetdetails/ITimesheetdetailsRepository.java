package com.fastcode.example.domain.core.timesheetdetails;

import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository("timesheetdetailsRepository")
public interface ITimesheetdetailsRepository
    extends JpaRepository<Timesheetdetails, Long>, QuerydslPredicateExecutor<Timesheetdetails> {}
