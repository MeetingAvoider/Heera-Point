import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images for the slider
  const sliderImages = [
    "https://m.media-amazon.com/images/I/61wXUQzvpjL.jpg",
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSPoR_nXrzfJgMrdSbaPrt-_O6Z1MmeJHmE67-XZoVwasC0vsPoTLiMTJ1ssfPFTCbnY5b4XmEH5nPkuzHxxOTDUF3_VLzE4CUg7JwmGPstWFO7_1DvV0I7w",
    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRla0KAwRzf3TxdYrR2eoLTZ9nMpnI99raiOFqr5EmuI1Odsplp8qS6kXH4Zd1vmaR53TtJ2m7-g0tgNWTo1FdVn2MrHKOao524bT7BBnM",
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSiQLNSF-KsW5iUfAaFOAx9Zqd-ur4_I5RSdwoeerpgjC0r6cosFJ_F16hV-XNWMJ_iQZ4LB5SYDaHKYh5mG0YHPiBr6ehbsO3x6m4zLk2D6MnMAT8Rl-Xu",
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Power Bank",
      description: "26800mAh Fast Charging Power Bank",
      image:
        "https://eu.baseus.com/cdn/shop/files/Baseus_Amblight_Power_Bank_65W_26800mAh_1_800x.jpg?v=1698751586",
      category: "power_banks",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      description: "Noise Cancelling True Wireless Earbuds",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqEd3EOgUacqrgApaW7S2z_C1FhoAbS7J952Yjdzo_jX7cj9pK577wMCjBiLso7ZGFSldwkJzw-bjbTXR7l9ihSV8JHGEN22n5Mh01b2VLp1dwDOpWZZIJEw",
      category: "audio_accessories",
    },
    {
      id: 3,
      name: "Phone Case",
      description: "Shockproof Clear Case for iPhone",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7yshrGaQAc0tfCl8p-j6wJ1znUclH5FNighm3OT6J51F1d7kw9emzmzC4D1DPcyfztR6ikRsw8K-jXeu59snvjJsMiNp7-aEZYIIikRc",
      category: "phone_cases",
    },
  ];

  // Categories for quick access
  const categories = [
    { name: "Chargers & Cables", id: "chargers_cables", icon: "⚡" },
    { name: "Audio Accessories", id: "audio_accessories", icon: "🎧" },
    { name: "Phone Cases", id: "phone_cases", icon: "📱" },
    { name: "Power Banks", id: "power_banks", icon: "🔋" },
  ];

  // Auto advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Heera Cell Point</h1>
          <p>
            Your one-stop shop for premium mobile and electronic accessories
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQFgiIRDj9qnMWpctPBbtTVi11EMsutQ8s5lXOrD2yCYaiimDaELPNvuh0js3kLozy2uj99AfndcsGUe2Rk73FdfWNAMAMRNaKf87QQw6rP7p-kdZf9b7kFLQ"
            alt="Mobile Accessories"
          />
        </div>
      </section>

      {/* Quick Category Access */}
      <section className="quick-categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.id}`}
              className="category-card"
              key={category.id}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link
                  to={`/products?category=${product.category}`}
                  className="view-more"
                >
                  View Similar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over ₹500</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Fast Charging</h3>
            <p>Premium quality products</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Multiple payment options</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>
              "Excellent quality products and fast delivery. Would definitely
              recommend!"
            </p>
            <div className="customer-name">- Rahul S.</div>
          </div>
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>
              "The power bank I purchased works brilliantly. Great customer
              service too!"
            </p>
            <div className="customer-name">- Priya M.</div>
          </div>
          <div className="testimonial-card">
            <div className="rating">★★★★☆</div>
            <p>
              "Good variety of products at reasonable prices. Happy with my
              purchase."
            </p>
            <div className="customer-name">- Aditya K.</div>
          </div>
        </div>
      </section>

      {/* Footer Image Slider */}
      <section className="footer-slider">
        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((image, index) => (
              <div className="slide" key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Enhance Your Tech Experience?</h2>
        <p>
          Explore our wide range of mobile and electronic accessories today!
        </p>
        <Link to="/products" className="btn btn-primary">
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
