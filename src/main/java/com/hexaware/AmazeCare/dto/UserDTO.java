package com.hexaware.AmazeCare.dto;

import java.util.Set;

import com.hexaware.AmazeCare.model.Role;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Set<Role> role;

    public UserDTO() {
        // Default constructor
    }

    public UserDTO(Long id, String username, String email, Set<Role> role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

}
