package com.fastcode.example.addons.emailbuilder.emailconverter.utils;

import static com.fastcode.example.addons.emailbuilder.emailconverter.utils.CommonUtil.checkValue;

import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Background;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Border;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Elements;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Height;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.LineHeight;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Options;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Padding;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Request;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Size;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Structures;
import com.fastcode.example.addons.emailbuilder.emailconverter.dto.request.Width;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailMjmlTemplateGenrator {

    @Value("${mjmlFile.base.dir}")
    private String mjmlFileBase;

    private String text2String(String path) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(path);
        String body = "";
        if (inputStream != null) {
            body = IOUtils.toString(inputStream, StandardCharsets.UTF_8.name());
        }
        return body;
    }

    private String createPadding(Padding padding) {
        return (
            checkValue.apply(padding.getTop(), "10") +
            "px " +
            checkValue.apply(padding.getRight(), "25") +
            "px " +
            checkValue.apply(padding.getBottom(), "10") +
            "px " +
            checkValue.apply(padding.getLeft(), "25") +
            "px"
        );
    }

    private String createBackground(Background background) {
        return (
            checkValue.apply(background.getColor(), "white") +
            " " +
            checkValue.apply(background.getUrl(), "") +
            " && " +
            checkValue.apply(background.getUrl(), "") +
            " " +
            checkValue.apply(background.getRepeat(), "no-repeat") +
            " top center"
        );
    }

    private String createWidth(Width width) {
        String value = width.isAuto() ? "auto " : "";
        value =
            Arrays.asList("%", "px").stream().anyMatch(string -> string.compareTo(width.getUnit()) == 0)
                ? value + width.getValue() + width.getUnit()
                : value;
        value = value + width.getUnit();
        return value;
    }

    private String createHeight(Height height) {
        String value = height.isAuto() ? "auto " : "";
        value =
            Arrays.asList("%", "px").stream().anyMatch(string -> string.compareTo(height.getUnit()) == 0)
                ? value + height.getValue() + height.getUnit()
                : value;
        value = value + height.getUnit();
        return value;
    }

    private String createWidthHeight(Size size) {
        String value = size.getAuto().compareTo("false") == 0 ? "auto " : "";
        value =
            Arrays.asList("%", "px").stream().anyMatch(string -> string.compareTo(size.getUnit()) == 0)
                ? value + size.getValue() + size.getUnit()
                : value;
        return value;
    }

    private String createBorder(Border border) {
        return (
            checkValue.apply(border.getWidth(), "4") +
            "px " +
            checkValue.apply(border.getStyle(), "solid") +
            " " +
            checkValue.apply(border.getColor(), "#000000")
        );
    }

    private String createLineHeight(LineHeight lineHeight) {
        return lineHeight.getUnit().compareToIgnoreCase("none") != 0
            ? checkValue.apply(lineHeight.getValue(), "22") + checkValue.apply(lineHeight.getUnit(), "px")
            : "120%";
    }

    private String getColumnWidth(String type, int index) {
        if (type.compareToIgnoreCase("cols_12") == 0) {
            return index == 0 ? "60" : "40";
        }
        return index == 0 ? "40" : "60";
    }

    private String getText(String innerText, Options options) {
        String template =
            "<mj-text \n css-class=\"ip-text-block\"" +
            "\n color=\"%1$s\"" +
            "\n font-family=\"%2$s\"" +
            "\n font-size=\"%3$spx\"" +
            "\n font-style=\"%4$s\"" +
            "\n font-weight=\"%5$s\"" +
            "\n text-decoration=\"none\"" +
            "\n align=\"left\"" +
            "\n line-height=\"%6$s\"" +
            "\n padding=\"%7$s\">" +
            "\n  %8$s" +
            "</mj-text>";

        template =
            String.format(
                template,
                options.getColor(),
                options.getFont().getFamily(),
                options.getFont().getSize(),
                options.getFont().getStyle(),
                options.getFont().getWeight(),
                this.createLineHeight(options.getLineHeight()),
                this.createPadding(options.getPadding()),
                innerText
            );
        return template;
    }

    private String getImage(String src, Options options) {
        String template =
            "<mj-image" +
            "\n css-class=\"ip-image-block\"" +
            "\n padding=\"%1$s\"" +
            "\n border=\"%2$s\"" +
            "\n border-radius=\"%3$s\"" +
            " %4$s " +
            " %5$s" +
            "\n href=\"%6$s\"" +
            "\n target=\"%7$s\"" +
            "\n align=\"%8$s\"" +
            "\n title=\"%9$s\"" +
            "\n alt=\"%10$s\"" +
            "\n src=\"%11$s\">" +
            "</mj-image>";

        template =
            String.format(
                template,
                this.createPadding(options.getPadding()),
                this.createBorder(options.getBorder()),
                options.getBorder().getRadius(),
                !options.getWidth().isAuto() ? "\n width=\"" + options.getWidth().getValue() + "px\"" : " ",
                !options.getHeight().isAuto() ? "\n height=\"" + options.getHeight().getValue() + "px\"" : " ",
                options.getLink().getHref(),
                options.getLink().getTarget(),
                options.getAlign(),
                options.getTitle(),
                options.getTitle(),
                src
            );
        return template;
    }

    private String getButton(String innerText, Options options) {
        String template =
            "<mj-button" +
            "\n css-class=\"ip-button-block\"" +
            "\n background-color=\"%1$s\"" +
            "\n border=\"%2$s\"" +
            "\n border-radius=\"%3$s\"px" +
            "\n color=\"%4$s\"" +
            "\n align=\"%5$s\"" +
            "\n vertical-align=\"middle\"" +
            "\n line-height=\"%6$s\"" +
            "\n href=\"%7$s\"" +
            "\n target=\"%9$s\"" +
            "\n padding=\"%10$s\"" +
            "\n inner-padding=\"%11$s\"" +
            "\n font-family=\"%12$s\"" +
            "\n font-size=\"%13$s\"px" +
            "\n font-style=\"%14$s\"" +
            "\n font-weight=\"%15$s\">" +
            "</mj-button>";
        template =
            String.format(
                template,
                options.getBackground().getColor(),
                this.createBorder(options.getBorder()),
                options.getBorder().getRadius(),
                options.getColor(),
                options.getAlign(),
                this.createLineHeight(options.getLineHeight()),
                options.getLink().getHref(),
                options.getLink().getTarget(),
                this.createPadding(options.getPadding()),
                this.createPadding(options.getPadding()),
                options.getFont().getFamily(),
                options.getFont().getSize(),
                options.getFont().getStyle(),
                options.getFont().getWeight(),
                innerText
            );
        return template;
    }

    private String getDivider(Options options) {
        String template =
            "<mj-divider" +
            "\n css-class=\"ip-divider-block\"" +
            "\n border-color=\"%1$s\"" +
            "\n border-style=\"%2$s\"" +
            "\n border-width=\"%3$s\"px" +
            "\n padding=\"%4$s\">" +
            "</mj-divider>";
        template =
            String.format(
                template,
                options.getBorder().getColor(),
                options.getBorder().getStyle(),
                options.getBorder().getWidth(),
                this.createPadding(options.getPadding())
            );
        return template;
    }

    private String getSpacer(Options options) {
        String template =
            "<mj-spacer" +
            "\n css-class=\"ip-spacer-block\"" +
            "\n padding=\"0\"" +
            "\n height=\"%1$s\">" +
            "</mj-spacer>";
        template = String.format(template, this.createHeight(options.getHeight()));
        return template;
    }

    private String getBlock(Elements block) {
        switch (block.getType()) {
            case "text":
                return this.getText(block.getInnerText(), block.getOptions());
            case "image":
                return this.getImage(block.getSrc(), block.getOptions());
            case "button":
                return this.getButton(block.getInnerText(), block.getOptions());
            case "divider":
                return this.getDivider(block.getOptions());
            case "spacer":
                return this.getSpacer(block.getOptions());
            default:
                return "";
        }
    }

    private String genrateTemplateSection(Structures structures) throws IOException {
        String template = this.text2String(mjmlFileBase + "/sectionTemp.txt");
        String type = structures.getType();
        String optionsBorder = this.createBorder(structures.getOptions().getBorder());
        String optionsPadding = this.createPadding(structures.getOptions().getPadding());
        String backgroundColor = structures.getOptions().getBackground().getColor();
        String backgroundUrl = structures.getOptions().getBackground().getUrl();
        String backgroundRepeat = structures.getOptions().getBackground().getRepeat();
        String backgroundSize = !structures.getOptions().getBackground().getSize().getValue().isEmpty()
            ? this.createWidthHeight(structures.getOptions().getBackground().getSize())
            : "auto";
        String mjColumnString =
            "<mj-column  %1$s padding=\"0\"\n" + " vertical-align=\"top\" \n" + " css-class=\"ip-column\"> ";
        Elements elements[][] = structures.getElements();
        String mjColumn = "";
        for (int i = 0; i < elements.length; i++) {
            Elements elements2[] = elements[i];
            mjColumn =
                mjColumn +
                String.format(
                    mjColumnString,
                    (
                        Arrays
                                .asList("cols_12", "cols_21")
                                .stream()
                                .anyMatch(string -> string.compareToIgnoreCase(structures.getType()) == 0)
                            ? "width=\" " + getColumnWidth(type, 0) + "%"
                            : ""
                    )
                );
            // Remaining Logic From Section.ts line 62
            String block = "\n";
            for (int j = 0; j < elements2.length; j++) {
                Elements elements3 = elements2[j];
                block = block + getBlock(elements3) + "\n";
            }
            mjColumn = mjColumn + block + "\n </mj-column> \n";
        }

        String elementsString = mjColumn;
        String finalTemplate = String.format(
            template,
            type,
            optionsBorder,
            optionsPadding,
            backgroundColor,
            backgroundUrl,
            backgroundRepeat,
            backgroundSize,
            elementsString
        );
        // System.out.println(finalTemplate);
        return finalTemplate;
    }

    public String genrateTemplateBody() throws IOException {
        System.out.println(mjmlFileBase + "/basicTemp.txt");
        String template = this.text2String(mjmlFileBase + "/basicTemp.txt");
        System.out.println(template);
        return template;
    }

    public String genrateTemplate(Request request) throws IOException {
        String hederPadding = this.createPadding(request.getGeneral().getGlobal().getPadding());
        String hederDirection = request.getGeneral().getDirection();
        String hederBodyPadding = this.createPadding(request.getGeneral().getPadding());
        String hederBodyBackground = this.createBackground(request.getGeneral().getBackground());
        String headerBackgroundSize = !request.getGeneral().getBackground().getSize().getValue().isEmpty()
            ? this.createWidthHeight(request.getGeneral().getBackground().getSize())
            : "";
        String bodyWidth = this.createWidth(request.getGeneral().getWidth());
        String bodyBackgroundColor = request.getGeneral().getBackground().getColor();

        String structures = request
            .getStructures()
            .stream()
            .map(
                structure -> { // System.out.println(structure.getType());
                    try {
                        String templateTest = this.genrateTemplateSection(structure);
                        // System.out.println(templateTest);
                        return templateTest;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return "";
                    }
                }
            )
            .reduce("", (a, b) -> a + " " + b);
        System.out.println(this.genrateTemplateBody());
        String templatae = String.format(
            this.genrateTemplateBody(),
            hederPadding,
            hederDirection,
            hederBodyPadding,
            hederBodyBackground,
            headerBackgroundSize,
            bodyWidth,
            bodyBackgroundColor,
            structures
        );
        System.out.println(templatae);
        return templatae;
    }
}
