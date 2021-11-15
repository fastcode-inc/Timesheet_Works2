package com.fastcode.example.domain.core.timeofftype;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.timesheetdetails.Timesheetdetails;
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
@Config(defaultVariableName = "timeofftypeEntity")
@Table(name = "timeofftype")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Timeofftype extends AbstractEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "typename", nullable = false, length = 255)
    private String typename;

    @OneToMany(mappedBy = "timeofftype", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Timesheetdetails> timesheetdetailsSet = new HashSet<Timesheetdetails>();

    public void addTimesheetdetails(Timesheetdetails timesheetdetails) {
        timesheetdetailsSet.add(timesheetdetails);

        timesheetdetails.setTimeofftype(this);
    }

    public void removeTimesheetdetails(Timesheetdetails timesheetdetails) {
        timesheetdetailsSet.remove(timesheetdetails);

        timesheetdetails.setTimeofftype(null);
    }
}
