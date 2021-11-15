package com.fastcode.example.domain.extended.task;

import com.fastcode.example.domain.core.task.ITaskRepository;
import org.springframework.stereotype.Repository;

@Repository("taskRepositoryExtended")
public interface ITaskRepositoryExtended extends ITaskRepository {
    //Add your custom code here
}
