package com.fastcode.example.domain.core.timesheetdetails;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.task.Task;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.querydsl.core.annotations.Config;
import java.math.BigDecimal;
import java.time.*;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "timesheetdetailsEntity")
@Table(name = "timesheetdetails")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Timesheetdetails extends AbstractEntity {

    @Basic
    @Column(name = "hours", nullable = true)
    private BigDecimal hours;

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "notes", nullable = true)
    private String notes;

    @Basic
    @Column(name = "workdate", nullable = false)
    private LocalDate workdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taskid")
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timeofftypeid")
    private Timeofftype timeofftype;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timesheetid")
    private Timesheet timesheet;
}
