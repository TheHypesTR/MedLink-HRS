import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Appointment.css';

function AppCard({ appointment, date, time = [], active = [], onClick }) {
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

AppCard.propTypes = {
  appointment: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.array,
  active: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default AppCard;
