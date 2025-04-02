package com.hexaware.AmazeCare.repository;

import com.hexaware.AmazeCare.model.AppointmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentDetailsRepository extends JpaRepository<AppointmentDetails, Long> {
    // Custom methods can be added as needed
}