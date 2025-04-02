package com.hexaware.AmazeCare.mapper;

import com.hexaware.AmazeCare.dto.MedicalRecordDTO;
import com.hexaware.AmazeCare.model.MedicalRecord;
import com.hexaware.AmazeCare.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class MedicalRecordMapper {

    public MedicalRecordDTO toDTO(MedicalRecord medicalRecord) {
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setId(medicalRecord.getId());
        dto.setPatientId(medicalRecord.getPatient().getId());
        dto.setRecordDate(medicalRecord.getRecordDate());
        dto.setDiagnosis(medicalRecord.getDiagnosis());
        dto.setTreatmentPlan(medicalRecord.getTreatmentPlan());
        dto.setNotes(medicalRecord.getNotes());
        return dto;
    }

    public MedicalRecord toEntity(MedicalRecordDTO dto, Patient patient) {
        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setId(dto.getId());
        medicalRecord.setPatient(patient);
        medicalRecord.setRecordDate(dto.getRecordDate());
        medicalRecord.setDiagnosis(dto.getDiagnosis());
        medicalRecord.setTreatmentPlan(dto.getTreatmentPlan());
        medicalRecord.setNotes(dto.getNotes());
        return medicalRecord;
    }
}
