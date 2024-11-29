import React from 'react'

export default function Card({card,onClick,isFlipped}) {
  return (
       <div className="card" onClick={onClick}>
      {isFlipped ? (
        <img src={card.image} alt={card.name} />
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  
  )
}
