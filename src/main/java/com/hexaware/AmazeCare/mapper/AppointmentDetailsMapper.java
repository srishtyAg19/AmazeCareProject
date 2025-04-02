package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.AppointmentDetailsDTO;
import com.hexaware.AmazeCare.model.AppointmentDetails;
import com.hexaware.AmazeCare.model.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentDetailsMapper {

    public AppointmentDetailsDTO toDTO(AppointmentDetails details) {
        AppointmentDetailsDTO dto = new AppointmentDetailsDTO();
        dto.setId(details.getId());
        dto.setAppointmentId(details.getAppointment().getId());
        dto.setPatientId(details.getPatient().getId());
        dto.setDoctorId(details.getDoctor().getId());
        dto.setConsultingDetails(details.getConsultingDetails());
        dto.setRecommendedTests(details.getRecommendedTests());
        dto.setPrescription(details.getPrescription());
        return dto;
    }

    public AppointmentDetails toEntity(AppointmentDetailsDTO dto, Appointment appointment) {
        AppointmentDetails details = new AppointmentDetails();
        details.setId(dto.getId());
        details.setAppointment(appointment);
        details.setPatient(appointment.getPatient());
        details.setDoctor(appointment.getDoctor());
        details.setConsultingDetails(dto.getConsultingDetails());
        details.setRecommendedTests(dto.getRecommendedTests());
        details.setPrescription(dto.getPrescription());
        return details;
    }
}
