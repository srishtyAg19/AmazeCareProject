package com.hexaware.AmazeCare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.AmazeCare.dto.JWTAuthResponse;
import com.hexaware.AmazeCare.dto.LoginDto;
import com.hexaware.AmazeCare.dto.RegisterDto;
import com.hexaware.AmazeCare.service.AuthService;

@RestController
@RequestMapping("/api/authenticate")
@CrossOrigin("*")  // Allow all origins or you can set the specific one
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto dto) {
        JWTAuthResponse token = authService.login(dto);
        return ResponseEntity.ok(token);
    }

    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDto dto) {
        String value = authService.register(dto);
        return new ResponseEntity<>(value, HttpStatus.CREATED);
    }
}
