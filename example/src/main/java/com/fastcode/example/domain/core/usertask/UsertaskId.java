package com.fastcode.example.domain.core.usertask;

import java.io.Serializable;
import java.time.*;
import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsertaskId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long taskid;
    private Long userid;

    public UsertaskId(Long taskid, Long userid) {
        this.taskid = taskid;
        this.userid = userid;
    }
}
