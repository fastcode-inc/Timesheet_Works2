package com.fastcode.example.addons.emailbuilder.emailconverter.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Elements {

    private String src = "";

    private String icon = "";

    private Options options = new Options();

    private State state = new State();

    private String type = "";

    private String innerText = "";

    @JsonProperty("file")
    private JsonNode file;

    public Elements() {}

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Options getOptions() {
        return options;
    }

    public void setOptions(Options options) {
        this.options = options;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getInnerText() {
        return innerText;
    }

    public void setInnerText(String innerText) {
        this.innerText = innerText;
    }

    public JsonNode getFile() {
        return file;
    }

    public void setFile(JsonNode file) {
        this.file = file;
    }
}
