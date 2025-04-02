package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.DoctorDTO;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.User;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public DoctorDTO toDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialty(doctor.getSpecialty());
        dto.setExperience(doctor.getExperience());
        dto.setQualification(doctor.getQualification());
        dto.setDesignation(doctor.getDesignation());
        dto.setContactNumber(doctor.getContactNumber());
        dto.setUserId(doctor.getUser().getId());
        return dto;
    }

    public Doctor toEntity(DoctorDTO dto, User user) {
        Doctor doctor = new Doctor();
        doctor.setId(dto.getId());
        doctor.setName(dto.getName());
        doctor.setSpecialty(dto.getSpecialty());
        doctor.setExperience(dto.getExperience());
        doctor.setQualification(dto.getQualification());
        doctor.setDesignation(dto.getDesignation());
        doctor.setContactNumber(dto.getContactNumber());
        doctor.setUser(user);
        return doctor;
    }
}
