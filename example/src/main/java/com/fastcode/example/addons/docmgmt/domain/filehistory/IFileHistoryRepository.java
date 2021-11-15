package com.fastcode.example.addons.docmgmt.domain.filehistory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "fileshistory", collectionResourceRel = "fileshistory")
public interface IFileHistoryRepository extends JpaRepository<FileHistory, Long> {
    @Modifying
    @Query("update FileHistory u set u.emailTemplateId = :emailTemplateId where u.id = :id")
    void updateFileEmailTemplate(@Param("id") Long id, @Param("emailTemplateId") Long emailTemplateId);

    @Query("select u.id from FileHistory u where   u.emailTemplateId = :emailTemplateId ")
    List<Long> getFileByEmailTemplateId(Long emailTemplateId);
}
