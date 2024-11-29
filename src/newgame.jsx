import React, { useEffect, useState } from 'react';

const cardImages = [
  { name: 'card1', image: 'https://cf-images.us-east-1.prod.boltdns.net/v1/static/5359769168001/0a823cb0-01a9-4835-a348-c64187783ccb/d37cb96c-805c-4aa2-9f2f-e62d9eb814c7/1280x720/match/image.jpg' },
  { name: 'card2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHV6kkKi30Bj6JeqBa7yQdn03Z-nEeuNWr4w&s' },
  { name: 'card3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQX2q7xp1KH5xqwf2gx_0Pk4s0R8N421kYg&s' },
  { name: 'card4', image: 'https://i.pinimg.com/736x/48/95/0c/48950c19001f2fc7b83d12465112902b.jpg' },
  { name: 'card5', image: 'https://wallpapers.com/images/featured/thor-pictures-19vj5w60l1w34gcm.jpg' },
  { name: 'card6', image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781481447386/valkyrie-9781481447386_hr.jpg' }
];

const Newgame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  // Shuffle cards based on difficulty and set initial state
  const initializeCards = () => {
    let cardSet = [];
    if (difficulty === 'easy') {
      cardSet = cardImages.slice(0, 3); // 3 pairs for easy (6 cards total)
    } else if (difficulty === 'medium') {
      cardSet = cardImages.slice(0, 4);
    } else {
      cardSet = cardImages; // All pairs 
    }

    const shuffledCards = [...cardSet, ...cardSet]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setIsGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setTimer(0);
  };

  // Start the timer when the component mounts
  useEffect(() => {
    let interval;
    if (!isGameOver) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameOver]);

  // Initialize cards when difficulty changes
  useEffect(() => {
    initializeCards();
  }, [difficulty]);


  const handleCardClick = (cardId) => {
    if (flippedCards.length < 2 && !flippedCards.includes(cardId) && !matchedCards.includes(cardId)) {
      const flipSound = new Audio('/WhatsApp Audio 2024-10-25 at 2.42.51 PM.mpga'); 
      flipSound.play()
  
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, cardId]);
      if (flippedCards.length === 1) {
        setAttempts((prevAttempts) => prevAttempts + 1);
  
        const firstCard = cards.find(card => card.id === flippedCards[0]);
        const secondCard = cards.find(card => card.id === cardId);
  
        if (firstCard.name === secondCard.name) {
          setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstCard.id, secondCard.id]);
          setFlippedCards([]); 
        } else {
          setTimeout(() => {
            const errorMatchSound = new Audio('/WhatsApp Audio 2024-10-25 at 3.00.42 PM.mpga'); // Path to error sound
            errorMatchSound.play();
            setFlippedCards([]); 
          }, 1000);
        }
      }
    }
  };
  

  // Function to restart the game
  const restartGame = () => {
    initializeCards();
  };

  // Check if the game is over
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameOver(true);
      const winSound = new Audio('/WhatsApp Audio 2024-10-25 at 2.42.50 PM.mpga'); 
      winSound.play();

    }
  }, [matchedCards, cards]);

  return (
    <div>
      <div className="controls">
        <header className='headings'>
          <h1>Avengers Memory Game</h1>
          <div id="btn">
            <label htmlFor="difficulty">Levels:</label>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </header>

        <div className='para'>
          <p className='para1'>Attempts: {attempts}</p>
          <p className='para2'>Time: {timer}s</p>
          <button onClick={restartGame} >Restart</button>
    
        </div>

        {isGameOver && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>🎉 You Won!! 🎉</p>}
      </div>

      {/* Cards Grid */}
      <div className={`game-container ${difficulty}`}>
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.id)} >
            {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
              <img src={card.image} alt={card.name} style={{ width: '100%', height: '100%' }} />
            ) : (
              <img src="https://png.pngtree.com/png-clipart/20220614/original/pngtree-question-mark-and-background-png-image_8029545.png" alt={card.name} style={{ width: '100%', height: '100%' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newgame;
