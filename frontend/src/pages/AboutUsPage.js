import React from "react";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About Heera Point</h1>
          <p className="tagline">
            Your Trusted Source for Mobile & Tech Accessories
          </p>
        </div>

        <section className="about-section story-section">
          <div className="section-content">
            <div className="section-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Heera Point began with a simple mission: to
                provide high-quality mobile accessories that enhance your tech
                experience without breaking the bank.
              </p>
              <p>
                What started as a small operation has quickly grown into one of
                the most trusted online destinations for mobile accessories,
                serving thousands of happy customers nationwide.
              </p>
              <p>
                Our founder's passion for technology and commitment to quality
                drives everything we do. We believe that great accessories
                should be accessible to everyone, regardless of budget.
              </p>
            </div>
            <div className="section-image">
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
                  alt="Heera Beginnings"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about-section values-section">
          <div className="section-content reverse">
            <div className="section-image">
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6"
                  alt="Our Values"
                />
              </div>
            </div>
            <div className="section-text">
              <h2>Our Values</h2>
              <div className="values-list">
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="value-content">
                    <h3>Quality First</h3>
                    <p>
                      We personally test all products to ensure they meet our
                      high standards.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="value-content">
                    <h3>Customer Satisfaction</h3>
                    <p>
                      Your happiness is our priority. We're not happy until you
                      are.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="value-content">
                    <h3>Sustainability</h3>
                    <p>
                      We're committed to reducing our environmental impact
                      through eco-friendly packaging.
                    </p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <div className="value-content">
                    <h3>Giving Back</h3>
                    <p>
                      A portion of every sale goes to supporting tech education
                      in underserved communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Team Member"
                />
              </div>
              <h3>James Wilson</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-desc">
                Tech enthusiast with 15+ years in the mobile industry.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Team Member"
                />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Head of Product</p>
              <p className="member-desc">
                Product specialist with an eye for quality and innovation.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://randomuser.me/api/portraits/men/68.jpg"
                  alt="Team Member"
                />
              </div>
              <h3>David Chen</h3>
              <p className="member-role">Customer Experience</p>
              <p className="member-desc">
                Dedicated to creating seamless shopping experiences.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Team Member"
                />
              </div>
              <h3>Maria Rodriguez</h3>
              <p className="member-role">Supply Chain Manager</p>
              <p className="member-desc">
                Ensures product quality and timely delivery.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Upgrade Your Tech Experience?</h2>
            <p>Browse our collection of premium mobile accessories today.</p>
            <a href="/" className="cta-button">
              Shop Now
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUsPage;
