package com.hexaware.AmazeCare.repository;

import com.hexaware.AmazeCare.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Fetch appointments by patient ID
    List<Appointment> findByPatientId(Long patientId);

    // Fetch appointments by doctor ID
    List<Appointment> findByDoctorId(Long doctorId);
}

