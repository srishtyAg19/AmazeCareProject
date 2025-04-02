package com.hexaware.AmazeCare.controller;

import com.hexaware.AmazeCare.dto.AppointmentDetailsDTO;
import com.hexaware.AmazeCare.service.AppointmentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment-details")
public class AppointmentDetailsController {

    @Autowired
    private AppointmentDetailsService detailsService;

    @PostMapping
    public ResponseEntity<AppointmentDetailsDTO> createAppointmentDetails(@RequestBody AppointmentDetailsDTO detailsDTO) {
        return ResponseEntity.ok(detailsService.createAppointmentDetails(detailsDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDetailsDTO> getAppointmentDetailsById(@PathVariable Long id) {
        return ResponseEntity.ok(detailsService.getAppointmentDetailsById(id));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDetailsDTO>> getAllAppointmentDetails() {
        return ResponseEntity.ok(detailsService.getAllAppointmentDetails());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDetailsDTO> updateAppointmentDetails(
            @PathVariable Long id, @RequestBody AppointmentDetailsDTO detailsDTO) {
        return ResponseEntity.ok(detailsService.updateAppointmentDetails(id, detailsDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointmentDetails(@PathVariable Long id) {
        detailsService.deleteAppointmentDetails(id);
        return ResponseEntity.noContent().build();
    }
}
