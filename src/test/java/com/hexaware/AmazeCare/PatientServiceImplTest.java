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

import com.hexaware.AmazeCare.dto.PatientDTO;
import com.hexaware.AmazeCare.mapper.PatientMapper;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.repository.UserRepository;
import com.hexaware.AmazeCare.service.PatientServiceImpl;

class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientMapper patientMapper;

    @InjectMocks
    private PatientServiceImpl service;

    private Patient patient;
    private PatientDTO patientDTO;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock data
        user = new User();
        user.setId(1L);

        patient = new Patient();
        patient.setId(1L);
        patient.setUser(user);

        patientDTO = new PatientDTO();
        patientDTO.setUserId(1L);
    }

    @Test
    void testCreatePatient() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(patientMapper.toEntity(patientDTO, user)).thenReturn(patient);
        when(patientRepository.save(patient)).thenReturn(patient);
        when(patientMapper.toDTO(patient)).thenReturn(patientDTO);

        PatientDTO result = service.createPatient(patientDTO);

        assertNotNull(result);
    }

    @Test
    void testGetPatientById() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        when(patientMapper.toDTO(patient)).thenReturn(patientDTO);

        PatientDTO result = service.getPatientById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetAllPatients() {
        when(patientRepository.findAll()).thenReturn(Stream.of(patient).collect(Collectors.toList()));
        when(patientMapper.toDTO(patient)).thenReturn(patientDTO);

        assertNotNull(service.getAllPatients());
    }
}