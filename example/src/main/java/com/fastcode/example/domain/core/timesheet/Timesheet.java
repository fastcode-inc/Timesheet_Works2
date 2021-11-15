package com.fastcode.example.domain.core.timesheet;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.authorization.users.Users;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
import com.fastcode.example.domain.core.timesheetstatus.Timesheetstatus;
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
@Config(defaultVariableName = "timesheetEntity")
@Table(name = "timesheet")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Timesheet extends AbstractEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "notes", nullable = true)
    private String notes;

    @Basic
    @Column(name = "periodendingdate", nullable = false)
    private LocalDate periodendingdate;

    @Basic
    @Column(name = "periodstartingdate", nullable = false)
    private LocalDate periodstartingdate;

    @OneToMany(mappedBy = "timesheet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Timesheetdetails> timesheetdetailsSet = new HashSet<Timesheetdetails>();

    public void addTimesheetdetails(Timesheetdetails timesheetdetails) {
        timesheetdetailsSet.add(timesheetdetails);

        timesheetdetails.setTimesheet(this);
    }

    public void removeTimesheetdetails(Timesheetdetails timesheetdetails) {
        timesheetdetailsSet.remove(timesheetdetails);

        timesheetdetails.setTimesheet(null);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timesheetstatusid")
    private Timesheetstatus timesheetstatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private Users users;
}
