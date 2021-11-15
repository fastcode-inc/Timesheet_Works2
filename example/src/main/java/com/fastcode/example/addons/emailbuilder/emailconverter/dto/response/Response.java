package com.fastcode.example.addons.emailbuilder.emailconverter.dto.response;

import java.util.ArrayList;
import java.util.List;

public class Response {

    private String html = "";

    private String mjml = "";

    private List<String> errors = new ArrayList<>();

    public Response() {}

    public Response(String html) {
        this.html = html;
    }

    public Response(String html, String mjml) {
        this.html = html;
        this.mjml = mjml;
    }

    public Response(List<String> errors) {
        this.errors = errors;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public String getMjml() {
        return mjml;
    }

    public void setMjml(String mjml) {
        this.mjml = mjml;
    }
}
