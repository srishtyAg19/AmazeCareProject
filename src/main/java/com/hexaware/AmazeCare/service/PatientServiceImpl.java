package com.hexaware.AmazeCare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.AmazeCare.customException.PatientNotFoundException;
import com.hexaware.AmazeCare.customException.UserNotFoundException;
import com.hexaware.AmazeCare.dto.PatientDTO;
import com.hexaware.AmazeCare.mapper.PatientMapper;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.model.User;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.repository.UserRepository;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientMapper patientMapper;

    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        User user = userRepository.findById(patientDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User", "ID", patientDTO.getUserId()));

        Patient patient = patientMapper.toEntity(patientDTO, user);
        Patient savedPatient = patientRepository.save(patient);
        return patientMapper.toDTO(savedPatient);
    }

    @Override
    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient", "ID", id));
        return patientMapper.toDTO(patient);
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDTO updatePatient(Long id, PatientDTO patientDTO) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient", "ID", id));
        User user = userRepository.findById(patientDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User", "ID", patientDTO.getUserId()));

        existingPatient.setFullName(patientDTO.getFullName());
        existingPatient.setGender(patientDTO.getGender());
        existingPatient.setEmail(patientDTO.getEmail());
        existingPatient.setDateOfBirth(patientDTO.getDateOfBirth());
        existingPatient.setContactNumber(patientDTO.getContactNumber());
        existingPatient.setUser(user);

        Patient updatedPatient = patientRepository.save(existingPatient);
        return patientMapper.toDTO(updatedPatient);
    }

    @Override
    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient", "ID", id));
        patientRepository.delete(patient);
    }
}
