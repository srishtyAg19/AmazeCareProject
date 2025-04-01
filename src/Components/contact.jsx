import React from 'react';
import './about.css'; // Using the same CSS file for consistency

const Contact = () => {
    return (
        <div className="about-container"> {/* Reusing .about-container for full-page design */}
            <h1 className="about-header">Contact Us</h1>
            <p className="about-description">
                We are here to assist you with your healthcare needs. Reach out to us for appointments, inquiries, or support.
            </p>

            <div className="services-section">
                <div className="service-card">
                    <h3 className="service-title">📍 Visit Us</h3>
                    <p>123 AmazeCare Street, Health City, Wellness State, 456789</p>
                </div>

                <div className="service-card">
                    <h3 className="service-title">📞 Call Us</h3>
                    <p>+91 98765 43210</p>
                </div>

                <div className="service-card">
                    <h3 className="service-title">📧 Email Us</h3>
                    <p>support@amazecare.com</p>
                </div>
            </div>

            <div className="doctor-section">
                <h2 className="about-header">Our Support Team</h2>
                <div className="doctor-list">
                    <div className="doctor-card">
                        <p className="doctor-name">Mr. Arjun Patel — Customer Support Lead</p>
                    </div>

                    <div className="doctor-card">
                        <p className="doctor-name">Ms. Priya Sharma — Appointment Coordinator</p>
                    </div>

                    <div className="doctor-card">
                        <p className="doctor-name">Mr. Rohan Mehta — Technical Support Specialist</p>
                    </div>
                </div>
            </div>

            <div className="contact-info">
                <p>🌐 Website: www.amazecare.com</p>
                <p>📍 Location: AmazeCare Wellness Center, Main Road, Health City</p>
            </div>
        </div>
    );
};

export default Contact;
