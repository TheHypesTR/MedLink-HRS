/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Appointment.css';

function DocCard({ name, polyclinicName, imgSrc, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div id='grid3'>
    <div 
      className={`doccard ${selected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <img 
        className="doccard-image" 
        src={imgSrc || './src/assets/default-card.jpg'} 
        alt={name} 
      />
      <h2 className="doccard-name">{name}</h2>
      <p className="doccard-polyclinicName">{polyclinicName}</p>
    </div>
    </div>
  );
}

export default DocCard;
