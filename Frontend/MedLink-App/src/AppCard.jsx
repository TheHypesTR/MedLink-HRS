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
    <div className="AppCard">
      <h2 className="AppCard-date">{date}</h2>
      <ul>
        {time.map((timeSlot, index) => (
          <li 
            key={index} 
            className={`time-slot ${active[index] ? 'deActive' : 'active'}`} 
            onClick={() => onClick(timeSlot)}
          >
            {timeSlot}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppCard;
