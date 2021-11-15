package com.fastcode.example.domain.core.timesheetstatus;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.timesheet.Timesheet;
import com.querydsl.core.annotations.Config;
import java.time.*;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDefs;

@Entity
@Config(defaultVariableName = "timesheetstatusEntity")
@Table(name = "timesheetstatus")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Timesheetstatus extends AbstractEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "statusname", nullable = false, length = 255)
    private String statusname;

    @OneToMany(mappedBy = "timesheetstatus", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Timesheet> timesheetsSet = new HashSet<Timesheet>();

    public void addTimesheets(Timesheet timesheets) {
        timesheetsSet.add(timesheets);

        timesheets.setTimesheetstatus(this);
    }

    public void removeTimesheets(Timesheet timesheets) {
        timesheetsSet.remove(timesheets);

        timesheets.setTimesheetstatus(null);
    }
}
