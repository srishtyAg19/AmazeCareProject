package com.hexaware.AmazeCare.repository;

import com.hexaware.AmazeCare.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    // Fetch medical records by patient ID
    List<MedicalRecord> findByPatientId(Long patientId);
}

