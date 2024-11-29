import React from 'react';



const Homee = () => {
  const playAudio = () => {
    const audio = new Audio('/WhatsApp Audio 2024-10-25 at 2.42.50 PM.mpga');
    audio.play();
  };

  return (
    <div>
      <h1>Play Sound Example</h1>
      <button onClick={playAudio}>Play Sound</button>
    </div>
  );
};

export default Homee;
