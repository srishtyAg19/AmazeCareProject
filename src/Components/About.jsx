import React from 'react';
import './about.css';

const services = [
    { name: "Cardiology", description: "Expert care for heart conditions and cardiovascular health." },
    { name: "Dermatology", description: "Advanced skincare treatments and expert consultation." },
    { name: "Orthopedics", description: "Specialized care for bones, joints, and muscles." },
    { name: "Neurology", description: "Comprehensive neurological care for brain and nerve disorders." },
    { name: "Pediatrics", description: "Dedicated care for children's health and development." },
    { name: "Radiology", description: "State-of-the-art imaging services for accurate diagnosis." },
    { name: "Oncology", description: "Cancer diagnosis, treatment, and care by specialists." },
    { name: "Gynecology", description: "Comprehensive care for women's reproductive health." },
    { name: "Urology", description: "Advanced urological care for various conditions." },
    { name: "Psychiatry", description: "Mental health support and counseling services." }
];

const doctors = [
    { name: "Dr. Rahul Sharma", specialization: "Cardiologist" },
    { name: "Dr. Priya Mehta", specialization: "Dermatologist" },
    { name: "Dr. Amit Verma", specialization: "Orthopedic Specialist" },
    { name: "Dr. Neha Gupta", specialization: "Neurologist" },
    { name: "Dr. Kunal Jain", specialization: "Oncologist" },
    { name: "Dr. Alka Singh", specialization: "Gynecologist" }
];

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-header">About AmazeCare</h1>
            <p className="about-description">
                Welcome to <b>AmazeCare</b>, where we combine advanced healthcare services with seamless technology to 
                provide the best medical care for you and your family. Our dedicated team of specialists ensures that 
                your health is our top priority. From comprehensive diagnostics to personalized treatment plans, 
                AmazeCare is your trusted healthcare partner.
            </p>

            {/* Services Section */}
            <div className="services-section">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <h3 className="service-title">{service.name}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Doctors Section */}
            <div className="doctor-section">
                <h2 className="about-header">Our Specialists</h2>
                <div className="doctor-list">
                    {doctors.map((doctor, index) => (
                        <div className="doctor-card" key={index}>
                            <p className="doctor-name">{doctor.name} - {doctor.specialization}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
                <p>📞 For Appointments: +91 98765 43210</p>
                <p>📧 Email Us: contact@amazecare.com</p>
            </div>
        </div>
    );
};

export default About;
