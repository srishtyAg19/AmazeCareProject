package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.MedicalRecordDTO;

import java.util.List;

public interface MedicalRecordService {
    MedicalRecordDTO createMedicalRecord(MedicalRecordDTO medicalRecordDTO);
    MedicalRecordDTO getMedicalRecordById(Long id);
    List<MedicalRecordDTO> getAllMedicalRecords();
    List<MedicalRecordDTO> getMedicalRecordsByPatientId(Long patientId);
    MedicalRecordDTO updateMedicalRecord(Long id, MedicalRecordDTO medicalRecordDTO);
    void deleteMedicalRecord(Long id);
}
