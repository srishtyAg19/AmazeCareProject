package com.hexaware.AmazeCare.dto;

import java.util.Set;

import com.hexaware.AmazeCare.model.Role;

public class RegisterDto {

    private String username;
    private String email;
    private String password;
    private Set<Role> role;
    public RegisterDto() { }
    public RegisterDto(String username, String email, String password, Set<Role> role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
 // Override toString for debugging
    @Override
    public String toString() {
        return "RegisterDto [username=" + username + ", email=" + email + ", role=" + role + "]";
    }

}
