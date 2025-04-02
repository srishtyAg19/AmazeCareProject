package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.AppointmentDetailsDTO;

import java.util.List;

public interface AppointmentDetailsService {
    AppointmentDetailsDTO createAppointmentDetails(AppointmentDetailsDTO detailsDTO);
    AppointmentDetailsDTO getAppointmentDetailsById(Long id);
    List<AppointmentDetailsDTO> getAllAppointmentDetails();
    AppointmentDetailsDTO updateAppointmentDetails(Long id, AppointmentDetailsDTO detailsDTO);
    void deleteAppointmentDetails(Long id);
}
