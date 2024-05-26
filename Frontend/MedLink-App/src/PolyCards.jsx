import React from 'react';
import PolyCard from './PolyCard';
import './PolyCards.css';

const cardsData = [
  {
    name: 'Faruk Kartlı',
    description: 'Bu bir Faruk kartıdır. Gören internet etsin.',
    imgSrc: 'https://images.unsplash.com/photo-1590424744257-fdb03ed78ae0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
  },
  // Diğer kart verileri buraya eklenebilir
];

function PolyCards() {
  return (
    <div className="grid">
      {cardsData.map((card, index) => (
        <PolyCard 
          key={index} 
          name={card.name} 
          description={card.description} 
          imgSrc={card.imgSrc} 
        />
      ))}
    </div>
  );
}

export default PolyCards;
