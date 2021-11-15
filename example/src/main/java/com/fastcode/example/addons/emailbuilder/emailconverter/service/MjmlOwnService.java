package com.fastcode.example.addons.emailbuilder.emailconverter.service;

import static com.fastcode.example.addons.emailbuilder.emailconverter.utils.CommonUtil.deleteFile;
import static com.fastcode.example.addons.emailbuilder.emailconverter.utils.CommonUtil.writeFile;

import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Request;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.response.Response;
import com.fastcode.example.addons.emailbuilder.emailconverter.utils.EmailMjmlTemplateGenrator;
import com.fastcode.example.addons.emailbuilder.emailconverter.utils.MjmlCommandLine;
import java.io.IOException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MjmlOwnService {

    @Autowired
    private EmailMjmlTemplateGenrator mjmlTemplateGenrator;

    //
    // private static final String DUMMY_TEMPLATE =
    // "<mjml><mj-body><mj-container><mj-section><mj-column><mj-text
    // \"message\"></mj-text></mj-column></mj-section></mj-container></mj-body></mjml>";

    @Value("${mjmlFile.path}")
    private String mjmlFilePath;

    public Response genrateHtml(Request request) throws IOException {
        String mjmlTemplate = mjmlTemplateGenrator.genrateTemplate(request);
        String file = String.format(mjmlFilePath, new Date().getTime());
        writeFile.accept(mjmlTemplate, file);
        String resultHtmlMail = MjmlCommandLine.executeCommand(file);
        deleteFile(file);
        return new Response(resultHtmlMail);
    }

    public Response genrateMjml(Request request) throws IOException {
        String mjmlTemplate = mjmlTemplateGenrator.genrateTemplate(request);
        return new Response("", mjmlTemplate);
    }
}
