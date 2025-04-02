package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.UserDTO;
import com.hexaware.AmazeCare.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        return dto;
    }

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
//        user.setPassword(userDTO.getPassword()); // Ensure passwords are hashed before saving
        user.setRole(userDTO.getRole());
        return user;
    }
}
