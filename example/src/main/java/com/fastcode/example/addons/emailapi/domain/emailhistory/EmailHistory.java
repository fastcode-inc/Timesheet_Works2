package com.fastcode.example.addons.emailapi.domain.emailhistory;

import com.fastcode.example.domain.core.abstractentity.AbstractEntity;
import java.util.Date;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "email_history")
@Getter
@Setter
public class EmailHistory extends AbstractEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(columnDefinition = "TEXT", name = "body", nullable = true)
    private String body;

    @Basic
    @Column(name = "to_", nullable = false, length = 256)
    private String to;

    @Basic
    @Column(name = "cc", nullable = true, length = 256)
    private String cc;

    @Basic
    @Column(name = "bcc", nullable = true, length = 256)
    private String bcc;

    @Basic
    @Column(name = "subject", nullable = true, length = 256)
    private String subject;

    @Basic
    @Column(name = "reply_to", nullable = true, length = 256)
    private String replyTo;

    @Basic
    @Column(name = "sent_date", nullable = true, length = 256)
    private Date sentDate;

    @Basic
    @Column(name = "is_html", nullable = true, length = 256)
    private Boolean isHtml;
    //   @OneToMany(mappedBy = "emailHistory", cascade = CascadeType.ALL)
    // 	private Set<EmailAttachments> emailAttachmentsSet = new HashSet<EmailAttachments>();

    //   public void addEmailAttachments(EmailAttachments emailAttachments) {
    //   	emailAttachmentsSet.add(emailAttachments);
    //   	emailAttachments.setEmailHistory(this);
    //	}

    //	public void removeEmailAttachments(EmailAttachments emailAttachments) {
    //		emailAttachmentsSet.remove(emailAttachments);
    //		emailAttachments.setEmailHistory(null);
    //	}

}
