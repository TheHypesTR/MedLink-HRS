import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items, id }) => {
    return (
        <div className={`dropdown ${id}`}>
            <div className="dropbtn">{title}</div>
            <div className="dropdown-content">
                <ol>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.link ? (
                                <Link to={item.link}>{item.label}</Link>
                            ) : (
                                item
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Dropdown;
