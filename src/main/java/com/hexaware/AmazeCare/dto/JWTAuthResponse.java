package com.hexaware.AmazeCare.dto;


import com.hexaware.AmazeCare.dto.UserDTO;

public class JWTAuthResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	//appending user details and JWT Token in response 
	private UserDTO userDto;
	public JWTAuthResponse() {	}
	
	public JWTAuthResponse(String accessToken,  UserDTO userDto) {
		super();
		this.accessToken = accessToken;
		
		this.userDto = userDto;
	}

	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getTokenType() {
		return tokenType;
	}
	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}
	public UserDTO getUserDto() {
		return userDto;
	}
	public void setUserDto(UserDTO userDto) {
		this.userDto = userDto;
	}}