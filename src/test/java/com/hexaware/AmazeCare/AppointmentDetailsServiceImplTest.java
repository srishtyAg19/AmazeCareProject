package com.hexaware.AmazeCare;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hexaware.AmazeCare.dto.AppointmentDetailsDTO;
import com.hexaware.AmazeCare.mapper.AppointmentDetailsMapper;
import com.hexaware.AmazeCare.model.Appointment;
import com.hexaware.AmazeCare.model.AppointmentDetails;
import com.hexaware.AmazeCare.repository.AppointmentDetailsRepository;
import com.hexaware.AmazeCare.repository.AppointmentRepository;
import com.hexaware.AmazeCare.service.AppointmentDetailsServiceImpl;

class AppointmentDetailsServiceImplTest {

    @Mock
    private AppointmentDetailsRepository detailsRepository;

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private AppointmentDetailsMapper detailsMapper;

    @InjectMocks
    private AppointmentDetailsServiceImpl service;

    private AppointmentDetails details;
    private AppointmentDetailsDTO detailsDTO;
    private Appointment appointment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock data
        appointment = new Appointment();
        appointment.setId(1L);

        details = new AppointmentDetails();
        details.setId(1L);
        details.setAppointment(appointment);
        details.setConsultingDetails("Sample Details");

        detailsDTO = new AppointmentDetailsDTO();
        detailsDTO.setAppointmentId(1L);
        detailsDTO.setConsultingDetails("Sample Details");
    }

    @Test
    void testCreateAppointmentDetails() {
        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));
        when(detailsMapper.toEntity(detailsDTO, appointment)).thenReturn(details);
        when(detailsRepository.save(details)).thenReturn(details);
        when(detailsMapper.toDTO(details)).thenReturn(detailsDTO);

        AppointmentDetailsDTO result = service.createAppointmentDetails(detailsDTO);

        assertNotNull(result);
    }

    @Test
    void testGetAppointmentDetailsById() {
        when(detailsRepository.findById(1L)).thenReturn(Optional.of(details));
        when(detailsMapper.toDTO(details)).thenReturn(detailsDTO);

        AppointmentDetailsDTO result = service.getAppointmentDetailsById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetAllAppointmentDetails() {
        when(detailsRepository.findAll()).thenReturn(Stream.of(details).collect(Collectors.toList()));
        when(detailsMapper.toDTO(details)).thenReturn(detailsDTO);

        assertNotNull(service.getAllAppointmentDetails());
    }
}