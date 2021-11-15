package com.fastcode.example.domain.core.project;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.task.Task;
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
@Config(defaultVariableName = "projectEntity")
@Table(name = "project")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@TypeDefs({})
public class Project extends AbstractEntity {

    @Basic
    @Column(name = "description", nullable = true)
    private String description;

    @Basic
    @Column(name = "enddate", nullable = false)
    private LocalDate enddate;

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Basic
    @Column(name = "startdate", nullable = false)
    private LocalDate startdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerid")
    private Customer customer;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Task> tasksSet = new HashSet<Task>();

    public void addTasks(Task tasks) {
        tasksSet.add(tasks);

        tasks.setProject(this);
    }

    public void removeTasks(Task tasks) {
        tasksSet.remove(tasks);

        tasks.setProject(null);
    }
}
