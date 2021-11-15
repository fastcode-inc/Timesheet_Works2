package com.fastcode.example.addons.emailbuilder.emailconverter.exception;

public class DublicateValueException extends RuntimeException {

    private String message = "";

    private static final long serialVersionUID = -5552557122145429399L;

    public DublicateValueException(String message) {
        super(message);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
