package com.fastcode.example.addons.emailbuilder.domain.irepository;

import com.fastcode.example.addons.emailbuilder.domain.model.MasterEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IMasterEntityRepository extends JpaRepository<MasterEntity, Long> {
    @Query(value = "select m.masterValue from MasterEntity m where m.masterName = :name")
    List<String> findMasterValueByMasterName(@Param(value = "name") String name);
}
