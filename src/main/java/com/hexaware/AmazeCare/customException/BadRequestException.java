package com.hexaware.AmazeCare.customException;

import org.springframework.http.HttpStatus;

public class BadRequestException extends RuntimeException {
    private HttpStatus status;

    public BadRequestException(HttpStatus status, String message) {
        super(message); // Pass the message to RuntimeException's constructor
        this.status = status;
    }

    public BadRequestException() {
        super();
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
