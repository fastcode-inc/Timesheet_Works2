package com.fastcode.example.addons.emailapi.restcontrollers;

import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.addons.emailapi.application.mail.EmailService;
import com.fastcode.example.addons.emailapi.application.mail.dto.CreateEmailInput;
import com.fastcode.example.addons.emailbuilder.application.emailtemplate.EmailTemplateAppService;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.EmailVariableAppService;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.FindEmailVariableByIdOutput;
import com.fastcode.example.addons.emailbuilder.domain.irepository.EmailMergeFieldEntityRepo;
import com.fastcode.example.addons.emailbuilder.domain.irepository.IEmailTemplateMappingRepo;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailMergeFieldEntity;
import com.fastcode.example.addons.emailbuilder.domain.model.EmailTemplateMappingEntity;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.EntityManager;
import javax.validation.Valid;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.transform.ResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController("emailApiController")
@RequestMapping("/emailapi/mail")
public class MailController {

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

    @Autowired
    private EmailMergeFieldEntityRepo emailMergeFieldEntityRepo;

    @Autowired
    private IEmailTemplateMappingRepo emailTemplateMappingRepo;

    public List<FileEntity> filearr = new ArrayList<>();

    @Autowired
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    public static final class CaseInsensitiveAliasTransformer implements ResultTransformer {

        private static final long serialVersionUID = 897484642248768L;

        @Override
        public Object transformTuple(Object[] values, String[] columns) {
            int len = columns.length;
            HashMap<String, Object> returnObj = new HashMap<String, Object>();
            for (int i = 0; i < len; i++) {
                Object obj = values[i];
                if (obj != null && obj instanceof Clob) {
                    Clob valClob = (Clob) values[i];
                    String valClobSubString = null;
                    try {
                        valClobSubString = valClob.getSubString(1, (int) valClob.length());
                    } catch (SQLException e) {}
                    returnObj.put(columns[i], valClobSubString);
                } else if (obj != null && obj instanceof Blob) {
                    Blob valClob = (Blob) values[i];
                    byte[] valClobSubString = null;
                    try {
                        valClobSubString = valClob.getBytes(1, (int) valClob.length());
                    } catch (SQLException e) {}
                    returnObj.put(columns[i], valClobSubString);
                } else {
                    returnObj.put(columns[i], values[i]);
                }
            }
            return returnObj;
        }

        @Override
        public List transformList(List collection) {
            return collection;
        }
    }

    @PreAuthorize("hasAnyAuthority('SENDEMAIL')")
    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public ResponseEntity sendEmail(@RequestBody @Valid CreateEmailInput email) throws IOException {
        List<FileEntity> lImages = new ArrayList<FileEntity>();
        lImages.addAll(email.getInlineImages());

        //ALL MERGE FIELDS IN A EMAIL TEMPLATE
        List<EmailMergeFieldEntity> mergeFieldsAvailable = emailMergeFieldEntityRepo.findByEmailTemplateId(
            email.getId()
        );

        //ALL MAPPED MERGE FIELDS
        List<EmailTemplateMappingEntity> mergeFieldMapped = emailTemplateMappingRepo.findByEmailTemplateEntityId(
            email.getId()
        );

        List<Object[]> mappedData = emailTemplateMappingRepo.getMappedData(email.getId());
        List<Object> dataList = new ArrayList<>();
        HashMap<Object, Object> mappedInfo = new HashMap<Object, Object>();
        if (mergeFieldMapped != null && mergeFieldMapped.size() > 0) {
            for (int i = 0; i < mappedData.size(); i++) {
                Object arr[] = mappedData.get(i);
                mappedInfo.put(arr[0], arr[1]);
            }

            String query = mergeFieldMapped.get(0).getDataSourceEntiry().getSqlQuery();
            Session session = entityManager.unwrap(Session.class);
            Query<Object> managerQuery = session.createSQLQuery(query);
            final CaseInsensitiveAliasTransformer insensitiveAliasTransformer = new CaseInsensitiveAliasTransformer();
            managerQuery.setResultTransformer(insensitiveAliasTransformer).list();
            if (managerQuery.getMaxResults() > 0) {
                dataList = managerQuery.list();
            }
        }

        HashMap<String, String> mergeFieldData = new HashMap<String, String>();

        if (dataList != null && dataList.size() > 0) {
            for (int i = 0; i < dataList.size(); i++) {
                HashMap<String, String> mapData = (HashMap<String, String>) dataList.get(i);
                Set<String> allKeys = mapData.keySet();
                for (String key : allKeys) {
                    String data = String.valueOf(mapData.get(key));
                    String mergeField = (String) mappedInfo.get(key);
                    mergeFieldData.put(mergeField, data);
                }

                sendMail(email, lImages, mergeFieldData);
            }
        } else {
            sendMail(email, lImages, null);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public void sendMail(
        @Valid CreateEmailInput email,
        List<FileEntity> lImages,
        HashMap<String, String> mergeFieldData
    )
        throws IOException {
        HashMap<Long, byte[]> imageDataSourceMap = new HashMap<>();
        String cc = replaceVariable(email.getCc(), mergeFieldData, imageDataSourceMap);
        String subject = replaceVariable(email.getSubject(), mergeFieldData, imageDataSourceMap);
        String bcc = replaceVariable(email.getBcc(), mergeFieldData, imageDataSourceMap);
        // String body = replaceVariable(email.getEmailBody());
        String contentjson = replaceVariable(email.getContentJson(), mergeFieldData, imageDataSourceMap);

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
            imageDataSourceMap
        );
    }

    private String replaceVariable(
        String input,
        HashMap<String, String> mergeFieldData,
        HashMap<Long, byte[]> imageDataSourceMap
    ) {
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
                String mergeField = m.group(0).substring(2, m.group(0).length() - 2);
                String data = reqData.get("value");
                boolean isReplaced = false;
                if (
                    mergeFieldData != null &&
                    mergeFieldData.containsKey(mergeField) &&
                    mergeFieldData.get(mergeField) != null
                ) {
                    isReplaced = true;
                    data = mergeFieldData.get(mergeField);
                }
                String variableType = reqData.get("type");
                String additionalConfig = reqData.get("additional_config");
                switch (variableType) {
                    case "Multi-line Text":
                        input = input.replaceAll(Pattern.quote(m.group(0)), "<pre>" + data + "</pre>");
                        break;
                    case "List":
                        String htmlContent = "";
                        if ("Bullet Verticle List".equalsIgnoreCase(additionalConfig)) {
                            if (data != null) {
                                String[] allValues = data.split(",");
                                htmlContent = "<ul>";
                                for (String d : allValues) {
                                    htmlContent += "<li>" + d + "</li>";
                                }
                                htmlContent += "</ul>";
                            }
                        } else if ("Numbered Vertical List".equalsIgnoreCase(additionalConfig)) {
                            if (data != null) {
                                String[] allValues = data.split(",");
                                htmlContent = "<ol>";
                                for (String d : allValues) {
                                    htmlContent += "<li>" + d + "</li>";
                                }
                                htmlContent += "</ol>";
                            }
                        } else {
                            htmlContent = data;
                        }
                        input = input.replaceAll(Pattern.quote(m.group(0)), htmlContent);
                        break;
                    case "Hyperlink":
                        String htmldata = data;
                        String anchorhtml = "<a href=" + htmldata + ">" + htmldata + "</a>";
                        input = input.replaceAll(Pattern.quote(m.group(0)), anchorhtml);
                        break;
                    case "Currency":
                        String actualData = data;
                        String dataCurrency = additionalConfig + actualData;
                        try {
                            input = input.replaceAll(Pattern.quote(m.group(0)), dataCurrency);
                        } catch (Exception e) {
                            input = input.replaceAll(Pattern.quote(m.group(0)), "\\" + dataCurrency);
                        }
                        break;
                    case "Percentage":
                        String datap = data + "%";
                        input = input.replaceAll(Pattern.quote(m.group(0)), datap);
                        break;
                    case "Image":
                        if (isReplaced) {
                            String fileIdPrevious = reqData.get("value");
                            input = input.replaceAll(Pattern.quote(m.group(0)), getImage(fileIdPrevious));
                            byte[] bytes = data.getBytes();
                            Optional<FileEntity> f = filesRepo.findById(Long.parseLong(fileIdPrevious));
                            if (f.isPresent()) {
                                f.get().setName(fileIdPrevious);
                                f.get().setSummary("IMAGE" + fileIdPrevious);
                                filearr.add(f.get());
                            }
                            imageDataSourceMap.put(Long.parseLong(fileIdPrevious), bytes);
                        } else {
                            String fileId = data;
                            input = input.replaceAll(Pattern.quote(m.group(0)), getImage(fileId));
                            Optional<FileEntity> f = filesRepo.findById(Long.parseLong(fileId));
                            if (f.isPresent()) {
                                f.get().setName(fileId);
                                f.get().setSummary("IMAGE" + fileId);
                                filearr.add(f.get());
                            }
                        }
                        break;
                    case "List of Images":
                        String multipleFileId = data;
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
                        String imageId = data;
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
                        String datadefault = data;
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
