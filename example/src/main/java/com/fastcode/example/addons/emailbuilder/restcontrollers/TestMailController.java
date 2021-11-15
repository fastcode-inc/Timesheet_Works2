package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.addons.emailapi.application.mail.EmailService;
import com.fastcode.example.addons.emailapi.application.mail.dto.CreateEmailInput;
import com.fastcode.example.addons.emailbuilder.application.emailtemplate.EmailTemplateAppService;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.EmailVariableAppService;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.FindEmailVariableByIdOutput;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/mail")
public class TestMailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailTemplateAppService emailTemplateAppService;

    @Autowired
    private EmailVariableAppService emailVariableAppService;

    @Autowired
    private Environment env;

    @Autowired
    private IFileRepository filesRepo;

    public List<FileEntity> filearr = new ArrayList<>();

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity sendEmail(@RequestBody @Valid CreateEmailInput email) throws IOException {
        List<FileEntity> lImages = new ArrayList<FileEntity>();
        lImages.addAll(email.getInlineImages());

        String cc = replaceVariable(email.getCc());
        String subject = replaceVariable(email.getSubject());
        String bcc = replaceVariable(email.getBcc());
        // String body = replaceVariable(email.getEmailBody());
        String contentjson = replaceVariable(email.getContentJson());

        List<FileEntity> lAttachments = new ArrayList<FileEntity>();
        lAttachments.addAll(filesRepo.getFileByEmailTemplateIdAndDeletedFalse(email.getId()));
        lImages.addAll(filearr);
        email.setEmailBody(emailTemplateAppService.convertJsonToHtml(contentjson));

        emailService.sendMessage(
            email.getTo(),
            cc,
            bcc,
            subject,
            email.getEmailBody(),
            lImages,
            lAttachments,
            new HashMap<Long, byte[]>()
        );

        return new ResponseEntity(HttpStatus.OK);
    }

    private String replaceVariable(String input) {
        if (input == null || input.length() == 0) return input;

        Pageable pageable = new OffsetBasedPageRequest(
            Integer.parseInt(env.getProperty("fastCode.offset.default")),
            Integer.parseInt(env.getProperty("fastCode.limit.default"))
        );

        HashMap<String, String> map = new HashMap<>();

        List<FindEmailVariableByIdOutput> tags;
        HashMap<String, HashMap<String, String>> myMap = new HashMap<>();
        try {
            SearchCriteria searchCriteria = SearchUtils.generateSearchCriteriaObject("");
            tags = emailVariableAppService.findAll();
            for (FindEmailVariableByIdOutput tag : tags) {
                HashMap<String, String> data = new HashMap<String, String>();
                data.put("value", tag.getDefaultValue());
                data.put("type", tag.getPropertyType());
                data.put("additional_config", tag.getMergeType());
                myMap.put("{{" + tag.getPropertyName() + "}}", data);
                switch (tag.getPropertyType()) {
                    case "Text":
                        map.put("{{" + tag.getPropertyName() + "}}", tag.getDefaultValue());
                        break;
                    case "Multi-line Text":
                        map.put("{{" + tag.getPropertyName() + "}}", tag.getDefaultValue());
                        break;
                    default:
                        map.put("{{" + tag.getPropertyName() + "}}", tag.getDefaultValue());
                }
            }
        } catch (Exception ex) {
            map.put("tag1", "tag one");
            map.put("{{tag2}}", "tag two");
        }

        final String regex = "\\{\\{([^}]*.?)\\}\\}";

        final Matcher m = Pattern.compile(regex).matcher(input);

        final List<String> matches = new ArrayList<>();
        while (m.find()) {
            matches.add(m.group(0));
            if (map.get(m.group(0)) != null) {
                HashMap<String, String> reqData = myMap.get(m.group(0));
                String variableType = reqData.get("type");
                String additionalConfig = reqData.get("additional_config");
                switch (variableType) {
                    case "Multi-line Text":
                        input = input.replaceAll(Pattern.quote(m.group(0)), "<pre>" + reqData.get("value") + "</pre>");
                        break;
                    case "List":
                        String htmlContent = "";
                        String data = reqData.get("value");
                        if ("Bullet Verticle List".equalsIgnoreCase(additionalConfig)) {
                            String[] allValues = data.split(",");
                            htmlContent = "<ul>";
                            for (String d : allValues) {
                                htmlContent += "<li>" + d + "</li>";
                            }
                            htmlContent += "</ul>";
                        } else if ("Numbered Vertical List".equalsIgnoreCase(additionalConfig)) {
                            String[] allValues = data.split(",");
                            htmlContent = "<ol>";
                            for (String d : allValues) {
                                htmlContent += "<li>" + d + "</li>";
                            }
                            htmlContent += "</ol>";
                        } else {
                            htmlContent = data;
                        }
                        input = input.replaceAll(Pattern.quote(m.group(0)), htmlContent);
                        break;
                    case "Hyperlink":
                        String htmldata = reqData.get("value");
                        String anchorhtml = "<a href=" + htmldata + ">" + htmldata + "</a>";
                        input = input.replaceAll(Pattern.quote(m.group(0)), anchorhtml);
                        break;
                    case "Currency":
                        String actualData = reqData.get("value");
                        String dataCurrency = additionalConfig + actualData;
                        try {
                            input = input.replaceAll(Pattern.quote(m.group(0)), dataCurrency);
                        } catch (Exception e) {
                            input = input.replaceAll(Pattern.quote(m.group(0)), "\\" + dataCurrency);
                        }
                        break;
                    case "Percentage":
                        String datap = reqData.get("value") + "%";
                        input = input.replaceAll(Pattern.quote(m.group(0)), datap);
                        break;
                    case "Image":
                        String fileId = reqData.get("value");
                        input = input.replaceAll(Pattern.quote(m.group(0)), getImage(fileId));
                        Optional<FileEntity> f = filesRepo.findById(Long.parseLong(fileId));
                        if (f.isPresent()) {
                            f.get().setName(fileId);
                            f.get().setSummary("IMAGE" + fileId);
                            filearr.add(f.get());
                        }
                        break;
                    case "List of Images":
                        String multipleFileId = reqData.get("value");
                        String arrImg[] = multipleFileId.split(",");
                        String imgListTemplate = "";
                        for (String file : arrImg) {
                            Optional<FileEntity> fl = filesRepo.findById(Long.parseLong(file));
                            if (fl.isPresent()) {
                                fl.get().setName(file);
                                fl.get().setSummary("IMAGE" + file);
                                filearr.add(fl.get());
                                imgListTemplate = imgListTemplate + getImage(file);
                            }
                        }
                        input = input.replaceAll(Pattern.quote(m.group(0)), imgListTemplate);
                        break;
                    case "Clickable Image":
                        String imageId = reqData.get("value");
                        input =
                            input.replaceAll(Pattern.quote(m.group(0)), getClickableImage("www.google.com", imageId));
                        Optional<FileEntity> imgFile = filesRepo.findById(Long.parseLong(imageId));
                        if (imgFile.isPresent()) {
                            imgFile.get().setName(imageId);
                            imgFile.get().setSummary("IMAGE" + imageId);
                            filearr.add(imgFile.get());
                        }
                        break;
                    default:
                        // case for number email date phone etc
                        String datadefault = reqData.get("value");
                        input = input.replaceAll(Pattern.quote(m.group(0)), datadefault);
                        break;
                }
            }
        }
        return input;
    }

    private String getImage(String src) {
        String template = "<img src='cid:IMAGE" + src + "'>";
        return template;
    }

    private String getClickableImage(String hrefLink, String src) {
        String template = "<a href='" + hrefLink + "'><img src='cid:IMAGE" + src + "'></a>";
        return template;
    }
}
