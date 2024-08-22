import { useEffect, useState } from 'react'
import './App.css'
import { SingleCard } from './components/SingleCard.jsx'


const cardImages = [
  { "src": "/img/bulbasaur.png", matched: false },
  { "src": "/img/charmander.png", matched: false },
  { "src": "/img/mewtwo.png", matched: false },
  { "src": "/img/pikachu.png", matched: false },
  { "src": "/img/snorlax.png", matched: false },
  { "src": "/img/squirtle.png", matched: false }
]


function App() {
  
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffledCards);
      setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500) ;
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1);
    setDisabled(false);
  }



  return (
    <div className="App">
      <h1>Pokemon Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
      
  );
}

export default App
