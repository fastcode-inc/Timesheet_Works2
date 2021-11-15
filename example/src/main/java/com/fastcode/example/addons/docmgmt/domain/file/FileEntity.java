package com.fastcode.example.addons.docmgmt.domain.file;

import com.fastcode.example.addons.emailapi.domain.emailattachments.EmailAttachments;
import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import java.util.Date;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;
import org.springframework.versions.*;

@Entity
@Table(name = "file")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class FileEntity extends AbstractEntity {

    @Basic
    @Column(name = "summary", nullable = true)
    private String summary;

    @Basic
    @Column(name = "created", nullable = true)
    private Date created;

    @Basic
    @Column(name = "content_id", nullable = true, length = 255)
    @ContentId
    private String contentId;

    @Basic
    @Column(name = "label", nullable = true)
    @VersionLabel
    private String label;

    @Basic
    @Column(name = "mime_type", nullable = true, length = 255)
    @MimeType
    private String mimeType;

    @Basic
    @Column(name = "successor_id", nullable = true)
    @SuccessorId
    private Long successorId;

    @Basic
    @Column(name = "ancestral_root_id", nullable = true)
    @AncestorRootId
    private Long ancestralRootId;

    @Basic
    @Column(name = "versionp", nullable = true)
    @VersionNumber
    private String versionp;

    @Basic
    @Column(name = "ancestor_id", nullable = true)
    @AncestorId
    private Long ancestorId;

    @Basic
    @Column(name = "name", nullable = true)
    private String name;

    @Basic
    @Column(name = "lock_owner", nullable = true, length = 255)
    @LockOwner
    private String lockOwner;

    @Basic
    @Column(name = "content_length", nullable = true)
    @ContentLength
    private Long contentLength;

    @Column(name = "email_template_id", nullable = true)
    private Long emailTemplateId;

    @Column(name = "email_variable_id", nullable = true)
    private Long emailVariableId;

    @Column
    private boolean deleted;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(mappedBy = "file", cascade = CascadeType.ALL)
    private EmailAttachments emailAttachments;

    public void setEmailAttachments(EmailAttachments emailAttachments) {
        if (emailAttachments == null) {
            if (this.emailAttachments != null) {
                this.emailAttachments.setFile(null);
            }
        } else {
            emailAttachments.setFile(this);
        }
        this.emailAttachments = emailAttachments;
    }

    // Copy constructor used to copy over custom fields when new version ius created
    public FileEntity(FileEntity f) {
        this.summary = f.summary;
        this.name = f.name;
    }
}
