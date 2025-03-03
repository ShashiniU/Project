import { Link } from "react-router-dom"
// import FeaturedGemstones from "../components/FeaturedGemstones"
import "./HomePage.css"
import placeholder from "../assets/images/placeholder.svg";


const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${placeholder})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="hero-content">
          <h1 className="hero-title">Discover Rare & Authentic Gemstones</h1>
          <p className="hero-subtitle">The world's premier marketplace for verified precious stones</p>
          <div className="hero-buttons">
            <Link to="/listings" className="btn btn-primary">
              Browse Gemstones
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Sell Your Gems
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose GemMarket</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Verified Authenticity</h3>
              <p className="feature-text">
                All gemstones are verified by trusted third-party providers to ensure authenticity
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Secure Transactions</h3>
              <p className="feature-text">Multiple secure payment options with buyer and seller protection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3 className="feature-title">Expert Curation</h3>
              <p className="feature-text">Detailed listings with expert descriptions and high-quality photos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Easy Buying & Selling</h3>
              <p className="feature-text">Streamlined process for both buyers and sellers with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gemstones */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Gemstones</h2>
          {/* <FeaturedGemstones /> */}
          <div className="view-all">
            <Link to="/listings" className="btn btn-secondary">
              View All Gemstones
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create an Account</h3>
              <p className="step-text">Sign up for free and complete your profile</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Browse or List</h3>
              <p className="step-text">Find gemstones or create detailed listings with photos</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Verification</h3>
              <p className="step-text">All gemstones undergo authentication by experts</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3 className="step-title">Secure Transaction</h3>
              <p className="step-text">Complete purchase with our secure payment system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "I found a rare blue sapphire that I've been searching for years. The authentication process gave me
                  complete confidence in my purchase."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-name">Sarah Johnson</div>
                <div className="testimonial-role">Gemstone Collector</div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "As a seller, I appreciate how easy it is to create detailed listings and connect with serious buyers.
                  My sales have increased by 40%."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-name">Michael Chen</div>
                <div className="testimonial-role">Gemstone Dealer</div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The advanced search filters helped me find exactly what I was looking for. The secure payment system
                  made the transaction worry-free."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-name">Emily Rodriguez</div>
                <div className="testimonial-role">Jewelry Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Discover Rare Gemstones?</h2>
            <p className="cta-text">Join thousands of gem enthusiasts and professionals on GemMarket</p>
            <Link to="/register" className="btn btn-accent">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

