/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Appointment.css';

function PolyCard({ name, description, imgSrc, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div id='grid3'>
    <div 
      className={`polycard ${selected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <img 
        className="polycard-image" 
        src={imgSrc || './src/assets/default-card.jpg'} 
        alt={name} 
      />
      <h2 className="polycard-title">{name}</h2>
      <p className="polycard-text">{description}</p>
    </div>
    </div>
  );
}

export default PolyCard;
