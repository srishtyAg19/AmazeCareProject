package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.AppointmentDTO;
import com.hexaware.AmazeCare.model.Appointment;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentDTO toDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setPatientId(appointment.getPatient().getId());
        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setStatus(appointment.getStatus());
        return dto;
    }

    public Appointment toEntity(AppointmentDTO dto, Patient patient, Doctor doctor) {
        Appointment appointment = new Appointment();
        appointment.setId(dto.getId());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStatus(dto.getStatus());
        return appointment;
    }
}
