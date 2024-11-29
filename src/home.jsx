
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/game'); // Navigate to the Newgame route
  };

  return (
    <div id="game" style={{ position: 'relative', height: '100vh', margin: '-2%', padding: '0' }}>
      {/* Video background */}
      <video autoPlay loop muted style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1
        }}
      >
        <source src="/WhatsApp Video 2024-10-25 at 1.52.03 PM.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>

      <button id="gamestart" onClick={handleClick}>Start Game</button>
    </div>
  );
}
