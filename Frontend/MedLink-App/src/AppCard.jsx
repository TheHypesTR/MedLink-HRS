// AppCard.jsx
import React, { useState } from 'react';
import './Appointment.css';

function AppCard({ appointment, date, time, active, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = (timeSlot) => {
    setSelected(!selected);
    onClick(appointment, date, timeSlot);
  };

  return (
    <div className="AppCard">
      <h2 className="AppCard-date">{date}</h2>
      <ul>
        {time.map((timeSlot, index) => (
          <li 
            key={index} 
            className={`time-slot ${active[index] ? 'deActive' : 'active'}`} 
            onClick={() => handleClick(index)}
          >
            {timeSlot}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppCard;
