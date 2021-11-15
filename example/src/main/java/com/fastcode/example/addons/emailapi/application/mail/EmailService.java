package com.fastcode.example.addons.emailapi.application.mail;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import com.fastcode.example.addons.docmgmt.domain.file.IFileContentStore;
import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.addons.emailapi.domain.emailhistory.EmailHistory;
import com.fastcode.example.addons.emailapi.domain.emailhistory.EmailHistoryRepository;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("emailApiService")
public class EmailService implements IEmailService {

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    private Environment env;

    @Autowired
    private RestTemplateBuilder restTemplate;

    @Autowired
    private IFileContentStore contentStore;

    @Autowired
    private IFileRepository filesRepo;

    @Autowired
    EmailHistoryRepository emailHistoryRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public void sendMessage(
        String to,
        String cc,
        String bcc,
        String subject,
        String htmlContent,
        List<FileEntity> inlineImages,
        List<FileEntity> attachments,
        Map<Long, byte[]> imageDataSourceMap
    ) {
        MimeMessage message = emailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
            );

            String[] toArray = to.split(",", -1);
            String[] ccArray = cc != null ? cc.split(",", -1) : new String[0];
            String[] bccArray = bcc != null ? bcc.split(",", -1) : new String[0];

            helper.setTo(toArray);
            helper.setCc(ccArray);
            helper.setBcc(bccArray);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            // Use the true flag to indicate the text included is HTML

            for (FileEntity file : inlineImages) {
                try {
                    ByteArrayResource fileStreamResource = getFileStreamResource(
                        Long.valueOf(file.getName()),
                        imageDataSourceMap
                    );
                    if (fileStreamResource != null) helper.addInline(
                        file.getSummary(),
                        fileStreamResource,
                        "image/jpeg"
                    );
                } catch (Exception e) {
                    // ignore
                    //e.printStackTrace();
                }
            }

            // Now add the real attachments
            for (FileEntity file : attachments) {
                ByteArrayResource fileStreamResource = getFileStreamResource(file.getId(), imageDataSourceMap);
                if (fileStreamResource != null) helper.addAttachment(file.getName(), fileStreamResource);
            }
        } catch (MessagingException ex) {
            //ex.printStackTrace();
        }

        emailSender.send(message);
        saveHistory(to, cc, bcc, subject, htmlContent);
    }

    private void saveHistory(String to, String cc, String bcc, String subject, String htmlContent) {
        EmailHistory emailHistory = new EmailHistory();
        emailHistory.setTo(to);
        emailHistory.setCc(cc);
        emailHistory.setBcc(bcc);
        emailHistory.setSubject(subject);
        emailHistory.setBody(htmlContent);
        emailHistoryRepository.save(emailHistory);
    }

    public ByteArrayResource getFileStreamResource(Long fileId, Map<Long, byte[]> imageDataSourceMap) { // This method will download file using RestTemplate
        try {
            if (imageDataSourceMap.get(fileId) != null) {
                return new ByteArrayResource(imageDataSourceMap.get(fileId));
            }
            Optional<FileEntity> f = filesRepo.findById(fileId);
            // InputStreamResource inputStreamResource = new
            // InputStreamResource(contentStore.getContent(f.get()));

            InputStream content = contentStore.getContent(f.get());
            return content != null ? new ByteArrayResource(IOUtils.toByteArray(content)) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String appendInlineImagePrifix(String name) {
        if (name.startsWith("cid:")) {
            return name;
        } else {
            return "cid:" + name;
        }
    }
}
