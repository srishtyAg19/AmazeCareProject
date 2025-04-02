package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.PatientDTO;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.model.User;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public PatientDTO toDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFullName(patient.getFullName());
        dto.setEmail(patient.getEmail());
        dto.setGender(patient.getGender());
        dto.setDateOfBirth(patient.getDateOfBirth());
        dto.setContactNumber(patient.getContactNumber());
        dto.setUserId(patient.getUser().getId());
        dto.setEmail(patient.getEmail());
        return dto;
    }

    public Patient toEntity(PatientDTO dto, User user) {
        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setFullName(dto.getFullName());
        patient.setEmail(dto.getEmail());
        patient.setGender(dto.getGender());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setContactNumber(dto.getContactNumber());
        patient.setUser(user);
        patient.setEmail(dto.getEmail());
        return patient;
    }
}

