package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.JWTAuthResponse;
import com.hexaware.AmazeCare.dto.LoginDto;
import com.hexaware.AmazeCare.dto.RegisterDto;



public interface AuthService {
	JWTAuthResponse login(LoginDto dto);
	String register(RegisterDto dto);
}