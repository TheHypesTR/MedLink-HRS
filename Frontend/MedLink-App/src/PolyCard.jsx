import React, { useState } from 'react';
import './PolyCards.css';

function PolyCard({ name, description, imgSrc, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick(); // Kart tıklandığında, üst bileşene geri dönerek işlevi çağırır.
  };

  return (
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
  );
}

export default PolyCard;
