import './SingleCard.css'

export function SingleCard( { card, handleChoice, flipped, disabled} ) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped" : ""}>
              <img className="front" 
              src={card.src} 
              alt="card front" />
              <img className="back" 
              onClick={handleClick} 
              src="/img/pokemoncard.png" 
              alt="card back" />
            </div>
          </div>
    )
}