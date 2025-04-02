package com.hexaware.AmazeCare.dto;

public class LoginDto {
    private String username; // Updated to lowercase for naming conventions
    private String password;

    // Default constructor
    public LoginDto() { }

    // Parameterized constructor
    public LoginDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Override toString for debugging
    @Override
    public String toString() {
        return "LoginDto [username=" + username + ", password=" + password + "]";
    }
}
