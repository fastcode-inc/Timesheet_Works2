package com.fastcode.example.addons.emailbuilder.emailconverter.dto.response;

import java.util.ArrayList;
import java.util.List;

public class ResponseDto<T> {

    private String message = "";

    private int status;

    private List<T> data = new ArrayList<>();

    private long recordCount;

    public ResponseDto() {}

    public ResponseDto(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public ResponseDto(String message, int status, List<T> data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    public ResponseDto(String message, int status, List<T> data, long recordCount) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.recordCount = recordCount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getRecordCount() {
        return recordCount;
    }

    public void setRecordCount(long recordCount) {
        this.recordCount = recordCount;
    }
}
