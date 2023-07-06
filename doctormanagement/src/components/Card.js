import React from 'react';
import './Card.css';
const Card = ({ title, description, icon }) => {
  return (
    <div className="card">
      <i className={icon}></i>
      <h3 className='red'>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
