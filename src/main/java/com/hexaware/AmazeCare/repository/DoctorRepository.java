package com.hexaware.AmazeCare.repository;

import com.hexaware.AmazeCare.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Fetch a doctor by name
    Doctor findByName(String name);
    
}

