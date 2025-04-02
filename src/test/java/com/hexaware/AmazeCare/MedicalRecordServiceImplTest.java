package com.hexaware.AmazeCare;

import com.hexaware.AmazeCare.dto.MedicalRecordDTO;
import com.hexaware.AmazeCare.model.MedicalRecord;
import com.hexaware.AmazeCare.model.Patient;
import com.hexaware.AmazeCare.repository.MedicalRecordRepository;
import com.hexaware.AmazeCare.repository.PatientRepository;
import com.hexaware.AmazeCare.service.MedicalRecordServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

@SpringBootTest
class MedicalRecordServiceImplTest {

    @Autowired
    private MedicalRecordServiceImpl medicalRecordService;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @BeforeEach
    void setup() {
        // Clean up database before each test to ensure isolation
        medicalRecordRepository.deleteAll();
        patientRepository.deleteAll();

        // Seed patient data
        Patient patient = new Patient();
        patient.setFullName("John Doe");
        patient.setEmail("john.doe@example.com");
        patientRepository.save(patient);
    }

    @Test
    void testCreateMedicalRecord_Success() {
        // Prepare input data
        Patient patient = patientRepository.findAll().get(0);

        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setPatientId(patient.getId());
        dto.setRecordDate(LocalDate.now());
        dto.setDiagnosis("Flu");
        dto.setTreatmentPlan("Rest and medication");

        // Execute service method
        MedicalRecordDTO result = medicalRecordService.createMedicalRecord(dto);

        // Assertions
        assertNotNull(result, "The created medical record should not be null");
        assertEquals("Flu", result.getDiagnosis(), "The diagnosis should match");
        assertEquals(patient.getId(), result.getPatientId(), "The patient ID should match");
        assertNotNull(result.getRecordDate(), "The record date should not be null");
        assertEquals("Rest and medication", result.getTreatmentPlan(), "The treatment plan should match");
    }

    @Test
    void testGetMedicalRecordById_Success() {
        // Seed data for medical record
        Patient patient = patientRepository.findAll().get(0);

        MedicalRecord record = new MedicalRecord();
        record.setPatient(patient);
        record.setRecordDate(LocalDate.now());
        record.setDiagnosis("Fever");
        record.setTreatmentPlan("Medication");
        MedicalRecord savedRecord = medicalRecordRepository.save(record);

        // Execute service method
        MedicalRecordDTO result = medicalRecordService.getMedicalRecordById(savedRecord.getId());

        // Assertions
        assertNotNull(result, "The retrieved medical record should not be null");
        assertEquals(savedRecord.getDiagnosis(), result.getDiagnosis(), "The diagnosis should match");
        assertEquals(savedRecord.getTreatmentPlan(), result.getTreatmentPlan(), "The treatment plan should match");
        assertEquals(savedRecord.getPatient().getId(), result.getPatientId(), "The patient ID should match");
        assertEquals(savedRecord.getRecordDate(), result.getRecordDate(), "The record date should match");
    }

    @Test
    void testCreateMedicalRecord_InvalidPatientId() {
        // Prepare input data with an invalid patient ID
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setPatientId(999L); // Assume this ID doesn't exist in the database
        dto.setRecordDate(LocalDate.now());
        dto.setDiagnosis("Cold");
        dto.setTreatmentPlan("Rest");

        // Execute and expect an exception
        assertThrows(IllegalArgumentException.class, () -> {
            medicalRecordService.createMedicalRecord(dto);
        }, "Creating a medical record with invalid patient ID should throw an exception");
    }
}