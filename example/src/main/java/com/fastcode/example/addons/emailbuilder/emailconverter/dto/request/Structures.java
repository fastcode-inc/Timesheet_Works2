package com.fastcode.example.addons.emailbuilder.emailconverter.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Structures {

    private String columns = "";

    private Elements elements[][];

    private Options options = new Options();

    private String type = "";

    public Structures() {}

    public String getColumns() {
        return columns;
    }

    public void setColumns(String columns) {
        this.columns = columns;
    }

    public Elements[][] getElements() {
        return elements;
    }

    public void setElements(Elements[][] elements) {
        this.elements = elements;
    }

    public Options getOptions() {
        return options;
    }

    public void setOptions(Options options) {
        this.options = options;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
