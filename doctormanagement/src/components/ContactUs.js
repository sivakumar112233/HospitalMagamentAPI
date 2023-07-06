import React, { useEffect, useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const cardTimeout = setTimeout(() => {
      setShowCards(true);
    }, 1000); // Delay in milliseconds before showing the cards

    return () => {
      clearTimeout(cardTimeout);
    };
  }, []);

  const hospitalData = {
    contact: {
      phone: '123-456-7890',
      email: 'info@example.com',
      address: '123 Street, City, Country',
    },
    services: [
      'Emergency Care',
      'Laboratory Services',
      'Radiology Services',
      'Pharmacy Services',
    ],
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <div className="card-container">
        <div className={`contact-card ${showCards ? 'show' : ''}`}>
          <h3>Contact Us</h3>
          <p>Phone: {hospitalData.contact.phone}</p>
          <p>Email: {hospitalData.contact.email}</p>
          <p>Address: {hospitalData.contact.address}</p>
        </div>
        <div className={`services-card ${showCards ? 'show' : ''}`}>
          <h3>Our Services</h3>
          <div className="service-list">
            {hospitalData.services.map((service, index) => (
              <p key={index}>{service}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
