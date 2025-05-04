import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ContactUsPage.css";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Warangal, Telangana coordinates
  const telanganaCoords = { lat: 17.9689, lng: 79.5941 }; // Coordinates for Warangal, Telangana

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvUOUKBlaK81M0jGJKDIJy0D9XLxSNoPE&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
        };
        document.head.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    // Initialize map once the script is loaded
    if (mapLoaded && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: telanganaCoords,
        zoom: 10,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      });

      // Add a marker for our location
      new window.google.maps.Marker({
        position: telanganaCoords,
        map: map,
        title: "Heera Point Headquarters",
        animation: window.google.maps.Animation.DROP,
      });
    }
  }, [mapLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send form data to backend endpoint with the correct URL path
      await axios.post("/account/contact/", formData);

      setSubmitted(true);
      setLoading(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError("Failed to send message. Please try again later.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Please fill out the form below or reach
            out using the contact information.
          </p>
        </div>

        {/* Map Section */}
        <div className="map-container">
          <div className="map" ref={mapRef}>
            {!mapLoaded && <div className="map-loading">Loading map...</div>}
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <div className="error-message">
                    <p>{error}</p>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Our Location</h3>
              <p>Old P.N.G lane, J.P.N road</p>
              <p>Warangal, Telangana, India 506002</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Call Us</h3>
              <p>+91 9347142836</p>
              <p>Mon - Sat: 9am - 6pm</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>heeracallcompoint@gmail.com</p>
              <p>heeracallcompoint@gmail.com</p>
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
