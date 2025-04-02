package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.MedicalRecordDTO;
import com.hexaware.AmazeCare.mapper.MedicalRecordMapper;
import com.hexaware.AmazeCare.model.MedicalRecord;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.repository.MedicalRecordRepository;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MedicalRecordMapper medicalRecordMapper;

    @Override
    public MedicalRecordDTO createMedicalRecord(MedicalRecordDTO medicalRecordDTO) {
        Patient patient = patientRepository.findById(medicalRecordDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + medicalRecordDTO.getPatientId()));

        MedicalRecord medicalRecord = medicalRecordMapper.toEntity(medicalRecordDTO, patient);
        MedicalRecord savedRecord = medicalRecordRepository.save(medicalRecord);

        return medicalRecordMapper.toDTO(savedRecord);
    }

    @Override
    public MedicalRecordDTO getMedicalRecordById(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found with ID: " + id));
        return medicalRecordMapper.toDTO(record);
    }

    @Override
    public List<MedicalRecordDTO> getAllMedicalRecords() {
        return medicalRecordRepository.findAll().stream()
                .map(medicalRecordMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicalRecordDTO> getMedicalRecordsByPatientId(Long patientId) {
        List<MedicalRecord> records = medicalRecordRepository.findByPatientId(patientId);
        return records.stream()
                .map(medicalRecordMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecordDTO updateMedicalRecord(Long id, MedicalRecordDTO medicalRecordDTO) {
        MedicalRecord existingRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found with ID: " + id));

        Patient patient = patientRepository.findById(medicalRecordDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + medicalRecordDTO.getPatientId()));

        existingRecord.setPatient(patient);
        existingRecord.setRecordDate(medicalRecordDTO.getRecordDate());
        existingRecord.setDiagnosis(medicalRecordDTO.getDiagnosis());
        existingRecord.setTreatmentPlan(medicalRecordDTO.getTreatmentPlan());
        existingRecord.setNotes(medicalRecordDTO.getNotes());

        MedicalRecord updatedRecord = medicalRecordRepository.save(existingRecord);

        return medicalRecordMapper.toDTO(updatedRecord);
    }

    @Override
    public void deleteMedicalRecord(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found with ID: " + id));
        medicalRecordRepository.delete(record);
    }
}
