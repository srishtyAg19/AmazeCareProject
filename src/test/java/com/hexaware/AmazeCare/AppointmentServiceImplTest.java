package com.hexaware.AmazeCare;

import com.hexaware.AmazeCare.dto.AppointmentDTO;
import com.hexaware.AmazeCare.model.Appointment;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.repository.AppointmentRepository;
import com.hexaware.AmazeCare.repository.DoctorRepository;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.service.AppointmentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

@SpringBootTest
class AppointmentServiceImplTest {

    @Autowired
    private AppointmentServiceImpl appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @BeforeEach
    void setup() {
        // Clean up database
        appointmentRepository.deleteAll();
        patientRepository.deleteAll();
        doctorRepository.deleteAll();

        // Seed data
        Patient patient = new Patient();
        patient.setFullName("John Doe");
        patient.setEmail("john.doe@example.com");
        patientRepository.save(patient);

        Doctor doctor = new Doctor();
        doctor.setName("Dr. Smith");
        doctorRepository.save(doctor);
    }

    @Test
    void testCreateAppointment_Success() {
        // Prepare input data
        Patient patient = patientRepository.findAll().get(0);
        Doctor doctor = doctorRepository.findAll().get(0);

        AppointmentDTO dto = new AppointmentDTO();
        dto.setAppointmentDate(LocalDateTime.now());
        dto.setPatientId(patient.getId());
        dto.setDoctorId(doctor.getId());

        // Execute
        AppointmentDTO result = appointmentService.createAppointment(dto);

        // Assertions
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals(patient.getId(), result.getPatientId());
        assertEquals(doctor.getId(), result.getDoctorId());
    }

    @Test
    void testGetAppointmentById_Success() {
        // Seed data
        Patient patient = patientRepository.findAll().get(0);
        Doctor doctor = doctorRepository.findAll().get(0);

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(LocalDateTime.now());
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Execute
        AppointmentDTO result = appointmentService.getAppointmentById(savedAppointment.getId());

        // Assertions
        assertNotNull(result);
        assertEquals(savedAppointment.getId(), result.getId());
        assertEquals(savedAppointment.getPatient().getId(), result.getPatientId());
        assertEquals(savedAppointment.getDoctor().getId(), result.getDoctorId());
    }
}
