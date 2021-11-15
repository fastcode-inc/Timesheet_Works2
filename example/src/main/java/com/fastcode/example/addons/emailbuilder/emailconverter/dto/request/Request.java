package com.fastcode.example.addons.emailbuilder.emailconverter.dto.request;

import java.util.ArrayList;
import java.util.List;

public class Request {

    private General general = new General();

    private List<Structures> structures = new ArrayList<>();

    public General getGeneral() {
        return general;
    }

    public void setGeneral(General general) {
        this.general = general;
    }

    public List<Structures> getStructures() {
        return structures;
    }

    public void setStructures(List<Structures> structures) {
        this.structures = structures;
    }
}
