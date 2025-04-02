package com.hexaware.AmazeCare;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hexaware.AmazeCare.dto.UserDTO;
import com.hexaware.AmazeCare.mapper.UserMapper;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.UserRepository;
import com.hexaware.AmazeCare.service.UserServiceImpl;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl service;

    private User user;
    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock data
        user = new User();
        user.setId(1L);

        userDTO = new UserDTO();
        userDTO.setId(1L);
    }

    @Test
    void testCreateUser() {
        when(userMapper.toEntity(userDTO)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        UserDTO result = service.createUser(userDTO);

        assertNotNull(result);
    }

    @Test
    void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        UserDTO result = service.getUserById(1L);

        assertNotNull(result);
    }
}