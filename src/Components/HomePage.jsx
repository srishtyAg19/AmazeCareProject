import React, { useState } from "react";
import "../App.css";

const HomePage = () => {
  const specializations = [
    { name: "Cardiology", img: "https://lifelinehospitalkerala.com/wp-content/uploads/2024/09/woman-is-holding-heart-shaped-human-heart-with-right-hand-scaled.jpg.webp" },
    { name: "Dermatology", img: "https://kvthospitals.in/wp-content/uploads/sites/45/2024/07/Dermatology.jpg" },
    { name: "Orthopedics", img: "https://santhyahospitals.com/wp-content/uploads/2024/06/orthopedics.jpg" },
    { name: "Neurology", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7LBc8pNhi_bl9rQcN2qn-7jx_zGDbmxdX_Q&s" },
    { name: "Pediatrics", img: "https://www.diginerve.com/wp-content/uploads/2022/12/Important-Topics-to-Master-Pediatrics-in-PG.webp" },
    { name: "Radiology", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EfMlUU76RaYthXD5sHEiSHzpgcBbb8bbgg&s" },
    { name: "Oncology", img: "https://www.msd.com/wp-content/uploads/sites/9/2022/09/research-platform-5.jpg?resize=778,519" },
    { name: "Gynecology", img: "https://media.istockphoto.com/id/623127416/photo/breath-of-baby.jpg?s=612x612&w=0&k=20&c=euep7RRcqByM-w0fsHD5wzApEL_PxbhXvO87sagQ9Vk=" },
    { name: "Urology", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FVMkJVnQ5FJpfZPfSZ1JmMviJNglBClmAQ&s" },
    { name: "Psychiatry", img: "https://www.jeevanjyotihospitals.com/images/all-specialties/department-of-psychiatry/image.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? specializations.length - 4 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === specializations.length - 4 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="minimal-header">
        <div className="logo">
          <h1>AmazeCare</h1>
        </div>
        <div className="menu">
          <a href="#home" style={{ border: "none" }}>Home</a>
          <a href="/about" style={{ border: "none" }}>About Us</a>
          <a href="/contact" style={{ border: "none" }}>Contact Us</a>
        </div>
        <div className="menu">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      </header>

      {/* Tagline Section */}
      <section className="tagline-section">
        <div className="tagline-text">
          <h2>Your Health, Simplified.</h2>
          <p>
            Welcome to AmazeCare, where advanced healthcare meets unparalleled
            convenience. Our mission is to revolutionize the way you manage your health
            —seamlessly book appointments, access medical records, and connect with
            top specialists all in one place. With cutting-edge technology and a
            compassionate team, we prioritize your well-being every step of the way.
            Experience personalized care like never before and take control of your
            health journey with confidence. At AmazeCare, your health, your ease, and
            your trust come first. Start your journey with us today!
          </p>
        </div>
        <img
          src="https://media.licdn.com/dms/image/D5612AQH2heo6D80YCg/article-cover_image-shrink_600_2000/0/1706788460035?e=2147483647&v=beta&t=sCqZsJRngWEah74etlROl91TQ6Uq7zXh-5Im3kNmKMk"
          alt="AmazeCare Hospital Management System"
          style={{
            maxWidth: '75%',
            height: '300px',
            objectFit: 'cover', // Ensures the image covers the square area, cropping if necessary
            border: '3px solid black',
            marginRight: '30px', // Adds a black border
          }}
        />
      </section>

      {/* Specializations Carousel */}
      <section className="action-section">
        <button className="carousel-btn" onClick={handlePrev}>
          &#10094; {/* Left arrow */}
        </button>
        <div className="carousel">
          {specializations.slice(currentIndex, currentIndex + 4).map((specialization, index) => (
            <div className="action-item" key={index}>
              <img
                src={specialization.img}
                alt={specialization.name}
                style={{ width: "100px", height: "100px", borderRadius: "10px", marginBottom: "10px" }}
              />
              <h3>{specialization.name}</h3>
            </div>
          ))}
        </div>
        <button className="carousel-btn" onClick={handleNext}>
          &#10095; {/* Right arrow */}
        </button>
      </section>

      {/* Footer Section */}
      <footer className="home-footer" id="footer">
        <p>Need assistance? <a href="/contact">Contact Us</a></p>
        <p>&copy; {new Date().getFullYear()} AmazeCare. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
