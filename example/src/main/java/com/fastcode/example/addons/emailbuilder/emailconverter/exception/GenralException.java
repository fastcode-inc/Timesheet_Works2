package com.fastcode.example.addons.emailbuilder.emailconverter.exception;

public class GenralException extends Exception {

    private static final long serialVersionUID = 6370442597162620718L;

    private String message;

    public GenralException(String message) {
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
