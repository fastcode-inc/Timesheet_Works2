package com.fastcode.example.addons.emailbuilder.emailconverter.exception;

import java.sql.SQLIntegrityConstraintViolationException;

public class DbException extends SQLIntegrityConstraintViolationException {

    private String message = "";

    /**
     *
     */
    private static final long serialVersionUID = 3768376784703439614L;

    public DbException() {
        // TODO Auto-generated constructor stub
    }

    public DbException(String reason) {
        super(reason);
        this.message = reason;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
