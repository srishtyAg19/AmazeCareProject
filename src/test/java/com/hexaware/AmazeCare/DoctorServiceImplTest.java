package com.hexaware.AmazeCare;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hexaware.AmazeCare.dto.DoctorDTO;
import com.hexaware.AmazeCare.mapper.DoctorMapper;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.DoctorRepository;
import com.hexaware.AmazeCare.repository.UserRepository;
import com.hexaware.AmazeCare.service.DoctorServiceImpl;

class DoctorServiceImplTest {

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DoctorMapper doctorMapper;

    @InjectMocks
    private DoctorServiceImpl service;

    private Doctor doctor;
    private DoctorDTO doctorDTO;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock data
        user = new User();
        user.setId(1L);

        doctor = new Doctor();
        doctor.setId(1L);
        doctor.setUser(user);

        doctorDTO = new DoctorDTO();
        doctorDTO.setUserId(1L);
    }

    @Test
    void testCreateDoctor() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(doctorMapper.toEntity(doctorDTO, user)).thenReturn(doctor);
        when(doctorRepository.save(doctor)).thenReturn(doctor);
        when(doctorMapper.toDTO(doctor)).thenReturn(doctorDTO);

        DoctorDTO result = service.createDoctor(doctorDTO);

        assertNotNull(result);
    }

    @Test
    void testGetDoctorById() {
        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        when(doctorMapper.toDTO(doctor)).thenReturn(doctorDTO);

        DoctorDTO result = service.getDoctorById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetAllDoctors() {
        when(doctorRepository.findAll()).thenReturn(Stream.of(doctor).collect(Collectors.toList()));
        when(doctorMapper.toDTO(doctor)).thenReturn(doctorDTO);

        assertNotNull(service.getAllDoctors());
    }
}