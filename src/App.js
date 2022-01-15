import React, { useState, useEffect } from 'react';
import SingleCard from '../src/components/SingleCard';
// import Image from '../public/img/cover.png';


const cardImages = [
    // { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false },
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)


    // Shuffle Cards
    const shuffleCards = () => {
        const shuffled = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setCards(shuffled);
        setTurns(0)
    }

    // Handle  a choice

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected card
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                console.log("It's not a match, try again.")
                resetTurn()

            }
        }
    }, [choiceOne, choiceTwo])
    console.log(cards)

    // Reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
    }
    return (
        <div className="App" >
            <h2>Magic Match Game</h2>
            <button onClick={shuffleCards} >New Game</button>
            {turns}

            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
                ))}
            </div>

        </div >
    )
}


export default App;