package com.hexaware.AmazeCare.service;

import com.hexaware.AmazeCare.dto.AppointmentDetailsDTO;
import com.hexaware.AmazeCare.mapper.AppointmentDetailsMapper;
import com.hexaware.AmazeCare.model.Appointment;
import com.hexaware.AmazeCare.model.AppointmentDetails;
import com.hexaware.AmazeCare.repository.AppointmentDetailsRepository;
import com.hexaware.AmazeCare.repository.AppointmentRepository;
import com.hexaware.AmazeCare.service.AppointmentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentDetailsServiceImpl implements AppointmentDetailsService {

    @Autowired
    private AppointmentDetailsRepository detailsRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentDetailsMapper detailsMapper;

    @Override
    public AppointmentDetailsDTO createAppointmentDetails(AppointmentDetailsDTO detailsDTO) {
        Appointment appointment = appointmentRepository.findById(detailsDTO.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + detailsDTO.getAppointmentId()));

        AppointmentDetails details = detailsMapper.toEntity(detailsDTO, appointment);
        AppointmentDetails savedDetails = detailsRepository.save(details);

        return detailsMapper.toDTO(savedDetails);
    }

    @Override
    public AppointmentDetailsDTO getAppointmentDetailsById(Long id) {
        AppointmentDetails details = detailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Details not found with ID: " + id));
        return detailsMapper.toDTO(details);
    }

    @Override
    public List<AppointmentDetailsDTO> getAllAppointmentDetails() {
        return detailsRepository.findAll().stream()
                .map(detailsMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentDetailsDTO updateAppointmentDetails(Long id, AppointmentDetailsDTO detailsDTO) {
        AppointmentDetails existingDetails = detailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Details not found with ID: " + id));

        Appointment appointment = appointmentRepository.findById(detailsDTO.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + detailsDTO.getAppointmentId()));

        existingDetails.setAppointment(appointment);
        existingDetails.setConsultingDetails(detailsDTO.getConsultingDetails());
        existingDetails.setRecommendedTests(detailsDTO.getRecommendedTests());
        existingDetails.setPrescription(detailsDTO.getPrescription());

        AppointmentDetails updatedDetails = detailsRepository.save(existingDetails);

        return detailsMapper.toDTO(updatedDetails);
    }

    @Override
    public void deleteAppointmentDetails(Long id) {
        AppointmentDetails details = detailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Details not found with ID: " + id));
        detailsRepository.delete(details);
    }
}
