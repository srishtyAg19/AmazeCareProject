package com.hexaware.AmazeCare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment_details")
public class AppointmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key for the appointment_details table

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false) // Foreign key to appointments table
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Foreign key to patients table
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false) // Foreign key to doctors table
    private Doctor doctor;

    @Column(name = "consulting_details", length = 1000)
    private String consultingDetails; // Current symptoms, examination details

    @Column(name = "recommended_tests", length = 500)
    private String recommendedTests; // List of tests (e.g., blood test, X-ray)

    @Column(name = "prescription", length = 500)
    private String prescription; // Medicines and dosage instructions

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
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

