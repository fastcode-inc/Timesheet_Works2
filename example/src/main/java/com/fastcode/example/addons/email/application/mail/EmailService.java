package com.fastcode.example.addons.email.application.mail;

import com.fastcode.example.commons.logging.LoggingHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    public LoggingHelper logHelper;

    @Async
    public void sendEmail(SimpleMailMessage email) {
        try {
            emailSender.send(email);
        } catch (Exception e) {
            logHelper.getLogger().error(e.getMessage());
        }
    }

    public SimpleMailMessage buildEmail(String email, String subject, String emailText) {
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(email);
        emailMessage.setSubject(subject);
        emailMessage.setText(emailText);

        return emailMessage;
    }
}
