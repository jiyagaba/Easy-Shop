import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
        <Header/>
         <section className="bg-indigo-100 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">About EazyShop</h2>
        <p className="text-lg text-gray-600">Get to know us more</p>
      </section>
          <div style={styles.container}>
      
      <section style={styles.section}>
        <h2 style={styles.heading}>Who We Are</h2>
        <p style={styles.paragraph}>
          At EaxyShop, we believe that shopping should be an experience, not just a transaction. Founded in 2020, our journey began with a simple idea — to create an online store that puts customers first. We understand how overwhelming it can be to find reliable products online, and that’s why we meticulously curate each item, ensuring quality, affordability, and authenticity. Over the years, EaxyShop has grown into a trusted brand known for its exceptional customer service, diverse product range, and commitment to innovation. Our team is passionate about making your shopping seamless, enjoyable, and rewarding.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Our Mission</h2>
        <p style={styles.paragraph}>
          Our mission is to empower shoppers worldwide by providing access to high-quality products with unparalleled convenience. We strive to break down the barriers between customers and the products they love by harnessing the latest technology and data-driven insights. Beyond just selling products, we are committed to creating meaningful relationships with our customers, fostering trust, and continuously improving based on your feedback. EaxyShop is dedicated to setting new standards in e-commerce by prioritizing transparency, sustainability, and community.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Our Vision</h2>
        <p style={styles.paragraph}>
          Looking forward, we envision a world where online shopping is effortless, personalized, and enjoyable for everyone. We aim to be the global leader in e-commerce, known not only for our extensive catalog but also for our innovative approach to customer experience. Our vision includes integrating cutting-edge technologies like AI-powered recommendations, eco-friendly packaging, and seamless customer support that anticipates your needs. At EaxyShop, we aspire to build a community where shoppers feel valued and empowered, transforming the way people discover and purchase products online.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.paragraph}>
          We love hearing from our customers and partners! Whether you have a question, feedback, or just want to say hello, our dedicated support team is here to help. Reach out to us via email, phone, or even visit us at our headquarters. We are committed to responding promptly and ensuring your experience with EaxyShop is nothing short of excellent.
        </p>
        <p style={styles.contactInfo}><strong>Email:</strong> support@eaxyshop.com</p>
        <p style={styles.contactInfo}><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p style={styles.contactInfo}><strong>Address:</strong> 123 Commerce St, Shopville, USA</p>
      </section>
    </div>
    </div>
  
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px 25px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    color: '#222',
    lineHeight: 1.7,
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '3rem',
    marginBottom: '40px',
    fontWeight: '700',
    letterSpacing: '1.2px',
  },
  section: {
    marginBottom: '40px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#34495e',
    fontWeight: '600',
    borderBottom: '3px solid #8e44ad',
    paddingBottom: '8px',
    maxWidth: 'fit-content',
  },
  paragraph: {
    fontSize: '1.15rem',
    color: '#555',
    textAlign: 'justify',
    whiteSpace: 'pre-line',
  },
  contactInfo: {
    fontSize: '1.1rem',
    marginTop: '8px',
    color: '#444',
  },
};

export default About;
