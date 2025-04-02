package com.hexaware.AmazeCare.dto;

public class AppointmentDetailsDTO {
    private Long id;
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private String consultingDetails;
    private String recommendedTests;
    private String prescription;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getConsultingDetails() {
        return consultingDetails;
    }

    public void setConsultingDetails(String consultingDetails) {
        this.consultingDetails = consultingDetails;
    }

    public String getRecommendedTests() {
        return recommendedTests;
    }

    public void setRecommendedTests(String recommendedTests) {
        this.recommendedTests = recommendedTests;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }
}
