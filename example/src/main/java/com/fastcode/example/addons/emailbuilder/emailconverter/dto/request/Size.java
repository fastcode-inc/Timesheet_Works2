package com.fastcode.example.addons.emailbuilder.emailconverter.dto.request;

import java.util.ArrayList;
import java.util.List;

public class Size {

    private String unit = "";

    private String auto = "";

    private List<String> units = new ArrayList<>();

    private String value = "";

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getAuto() {
        return auto;
    }

    public void setAuto(String auto) {
        this.auto = auto;
    }

    public List<String> getUnits() {
        return units;
    }

    public void setUnits(List<String> units) {
        this.units = units;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
