package com.hexaware.AmazeCare.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.AmazeCare.customException.BadRequestException;
import com.hexaware.AmazeCare.dto.JWTAuthResponse;
import com.hexaware.AmazeCare.dto.LoginDto;
import com.hexaware.AmazeCare.dto.RegisterDto;
import com.hexaware.AmazeCare.dto.UserDTO;
import com.hexaware.AmazeCare.model.Role;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.UserRepository;
import com.hexaware.AmazeCare.security.JwtTokenProvider;
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepo,
                           PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public JWTAuthResponse login(LoginDto dto) {
        System.out.println("Login request received for user: " + dto.getUsername());

        // Authenticate user credentials
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(authentication);
        System.out.println("Token generated successfully: " + token);

        // Retrieve user from the database
        User user = userRepo.findByUsername(dto.getUsername())
                .orElseThrow(() -> new BadRequestException(HttpStatus.NOT_FOUND, "User not found"));

        // Prepare user DTO with role information
        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());  // Ensure this is a Set<Role>

        return new JWTAuthResponse(token, userDto);
    }

    @Override
    public String register(RegisterDto dto) {
        // Check if email already exists
        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new BadRequestException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // Create a new user entity
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Assign a default role to the user
        Set<Role> roles = new HashSet<>();
        roles.add(Role.PATIENT); // Default role (could be expanded in the future)
        user.setRole(roles);

        // Save the user to the repository
        userRepo.save(user);

        // Return a success message (you could also return the user details here)
        return "Registration successful for user: " + user.getUsername();
    }
}
