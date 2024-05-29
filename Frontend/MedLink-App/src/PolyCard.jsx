/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Appointment.css';

function PolyCard({ name, description, image, onClick }) {
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
        src={image || './src/assets/logo.png'} 
        alt={name} 
      />
      <h2 className="polycard-title">{name}</h2>
      <p className="polycard-text">{description}</p>
    </div>
    </div>
  );
}

export default PolyCard;
