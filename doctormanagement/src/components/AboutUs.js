import React from 'react';
import './AboutUs.css';
import Card from './Card';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="card-container">
        <div className="column">
          <Card
            title="Happy Customers"
            description="we 100 +happy customers at the hospital."
          />
          <Card
            title="Happy Clients"
            description="google ,facebook"
          />
        </div>
        <div className="column">
          <Card
            title="Our Mission"
            description="every one should be trated equally"
          />
        </div>
      </div>

      <h3 className="red-text">Values</h3>
      <div className="card-container">
        <div className="column ">
          <Card
            title="Excellence"
            description="We seek always to be the best and to bring out the best in each of our colleagues, and to nurture a culture that delivers excellent clinical quality, patient safety, service, and discovery.."
          />
          <Card
            title="Integrity"
            description="We earn trust and respect by acting in every circumstance with knowledge, honesty, discretion, and fairness."
          />
        </div>
        <div className="Respect">
          <Card
            title="Affordability"
            description="We honor and value the sand from our patients and their families.."
          />
          <Card
            title="Accessibility:"
            description="Our duty is to improve access to the healthcare we provide and to continuously extend this care to the communities we serve.."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
