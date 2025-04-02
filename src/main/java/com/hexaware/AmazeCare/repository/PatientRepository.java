package com.hexaware.AmazeCare.repository;

import com.hexaware.AmazeCare.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Fetch a patient by email
    Patient findByEmail(String email);
}


