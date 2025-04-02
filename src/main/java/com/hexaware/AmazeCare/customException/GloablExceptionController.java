package com.hexaware.AmazeCare.customException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GloablExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(PatientNotFoundException.class)
    public ResponseEntity<ErrorDetails> handlePatientNotFoundException(PatientNotFoundException exceptionObj, WebRequest w) {
        ErrorDetails e = new ErrorDetails(LocalDateTime.now(), exceptionObj.getMessage(), w.getDescription(false),
                "PATIENT_NOT_FOUND");

        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DoctorNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleDoctorNotFoundException(DoctorNotFoundException exceptionObj, WebRequest w) {
        ErrorDetails e = new ErrorDetails(LocalDateTime.now(), exceptionObj.getMessage(), w.getDescription(false),
                "DOCTOR_NOT_FOUND");

        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleDoctorNotFoundException(UserNotFoundException exceptionObj, WebRequest w) {
        ErrorDetails e = new ErrorDetails(LocalDateTime.now(), exceptionObj.getMessage(), w.getDescription(false),
                "User_NOT_FOUND");

        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleAppointmentNotFoundException(AppointmentNotFoundException exceptionObj, WebRequest w) {
        ErrorDetails e = new ErrorDetails(LocalDateTime.now(), exceptionObj.getMessage(), w.getDescription(false),
                "APPOINTMENT_NOT_FOUND");

        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode statuscode, WebRequest w) {
        Map<String, String> errors = new HashMap<>();

        List<ObjectError> errList = ex.getBindingResult().getAllErrors();
        errList.forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
