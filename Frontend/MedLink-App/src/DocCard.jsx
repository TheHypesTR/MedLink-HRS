/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Cards.css';

function PolyCard({ name, polyclinicName, imgSrc, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
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
  );
}

export default PolyCard;
