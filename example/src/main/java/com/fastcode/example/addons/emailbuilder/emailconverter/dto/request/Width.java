package com.fastcode.example.addons.emailbuilder.emailconverter.dto.request;

import java.util.ArrayList;
import java.util.List;

public class Width {

    private String unit = "";

    private List<String> units = new ArrayList<>();

    private String value = "";

    private boolean auto = false;

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public boolean isAuto() {
        return auto;
    }

    public void setAuto(boolean auto) {
        this.auto = auto;
    }
}
