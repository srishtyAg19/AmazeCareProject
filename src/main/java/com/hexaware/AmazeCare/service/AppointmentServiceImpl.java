package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.AppointmentDTO;
import com.hexaware.AmazeCare.mapper.AppointmentMapper;
import com.hexaware.AmazeCare.model.Appointment;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.repository.AppointmentRepository;
import com.hexaware.AmazeCare.repository.DoctorRepository;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentMapper appointmentMapper;

    @Override
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        // Fetch the Patient entity
        Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + appointmentDTO.getPatientId()));

        // Fetch the Doctor entity
        Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + appointmentDTO.getDoctorId()));

        // Map DTO to Entity
        Appointment appointment = appointmentMapper.toEntity(appointmentDTO, patient, doctor);

        // Save Appointment
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Map back to DTO
        return appointmentMapper.toDTO(savedAppointment);
    }

    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        // Fetch Appointment by ID
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));

        // Map to DTO
        return appointmentMapper.toDTO(appointment);
    }

    @Override
    public List<AppointmentDTO> getAllAppointments() {
        // Fetch all Appointments and map to DTO
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        // Fetch existing Appointment
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));

        // Fetch Patient entity
        Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + appointmentDTO.getPatientId()));

        // Fetch Doctor entity
        Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + appointmentDTO.getDoctorId()));

        // Update fields
        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);
        existingAppointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        existingAppointment.setStatus(appointmentDTO.getStatus());

        // Save updated Appointment
        Appointment updatedAppointment = appointmentRepository.save(existingAppointment);

        // Map back to DTO
        return appointmentMapper.toDTO(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        // Fetch Appointment
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));

        // Delete Appointment
        appointmentRepository.delete(appointment);
    }
}
