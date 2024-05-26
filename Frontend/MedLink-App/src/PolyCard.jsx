import React, { useState } from 'react';
import './PolyCards.css';

function PolyCard({ name, description, imgSrc }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div 
      className={`polycard ${selected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <img 
        className="polycard-image" 
        src={imgSrc || '/assets/default-card.jpg'} 
        alt={name} 
      />
      <h2 className="polycard-title">{name}</h2>
      <p className="polycard-text">{description}</p>
    </div>
  );
}

export default PolyCard;
