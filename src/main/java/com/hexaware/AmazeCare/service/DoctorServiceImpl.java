package com.hexaware.AmazeCare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.AmazeCare.customException.DoctorNotFoundException;
import com.hexaware.AmazeCare.customException.PatientNotFoundException;
import com.hexaware.AmazeCare.customException.UserNotFoundException;
import com.hexaware.AmazeCare.dto.DoctorDTO;
import com.hexaware.AmazeCare.mapper.DoctorMapper;
import com.hexaware.AmazeCare.model.Doctor;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.DoctorRepository;
import com.hexaware.AmazeCare.repository.UserRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        User user = userRepository.findById(doctorDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User", "ID", doctorDTO.getUserId()));

        Doctor doctor = doctorMapper.toEntity(doctorDTO, user);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return doctorMapper.toDTO(savedDoctor);
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor", "ID", id));
        return doctorMapper.toDTO(doctor);
    }

    @Override
    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor", "ID", id));
        User user = userRepository.findById(doctorDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User", "ID", doctorDTO.getUserId()));

        existingDoctor.setName(doctorDTO.getName());
        existingDoctor.setSpecialty(doctorDTO.getSpecialty());
        existingDoctor.setExperience(doctorDTO.getExperience());
        existingDoctor.setQualification(doctorDTO.getQualification());
        existingDoctor.setDesignation(doctorDTO.getDesignation());
        existingDoctor.setContactNumber(doctorDTO.getContactNumber());
        existingDoctor.setUser(user);

        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return doctorMapper.toDTO(updatedDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor", "ID", id));
        doctorRepository.delete(doctor);
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toDTO)
                .collect(Collectors.toList());
    }
}
