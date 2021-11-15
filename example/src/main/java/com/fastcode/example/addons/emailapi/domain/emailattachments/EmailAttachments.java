package com.fastcode.example.addons.emailapi.domain.emailattachments;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import com.fastcode.example.addons.emailapi.domain.emailhistory.EmailHistory;
import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "email_attachments")
@Getter
@Setter
public class EmailAttachments extends AbstractEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(name = "file_id", nullable = false)
    private Long fileId;

    @Basic
    @Column(name = "email_id", nullable = false)
    private Long emailId;

    @Basic
    @Column(name = "type", nullable = false, length = 256)
    private String type;

    @ManyToOne
    @JoinColumn(name = "email_id", insertable = false, updatable = false)
    private EmailHistory emailHistory;

    @OneToOne
    @JoinColumn(name = "file_id", insertable = false, updatable = false)
    private FileEntity file;
}
