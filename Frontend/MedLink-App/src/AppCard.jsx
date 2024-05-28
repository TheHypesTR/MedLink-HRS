/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Appointment.css';

function AppCard({ date, time, active, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div 
      className={`AppCard ${selected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <h2 className="AppCard-date">{date}</h2>
      <ul className="AppCard-times">
        {time.map((t, index) => (
          <li 
            key={index} 
            className={`AppCard-time ${active[index] ? 'deActive' : 'active'}`}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppCard;
