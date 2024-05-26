import Card from "./Card.jsx";
import "../styles/Cards.css";
import PropTypes from "prop-types";
import { useState } from "react";

function Cards({ cards, updateScore }) {
    const [clickedCards, setClickedCards] = useState([]);
    
    return (
        <div className="cards">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    imgUrl={card.imgUrl}
                    name={card.name}
                    updateScore={() => {
                        if (clickedCards.includes(card.id)) {
                            setClickedCards([]);
                            updateScore("reset");
                            return;
                        }

                        setClickedCards([...clickedCards, card.id]);
                        updateScore();
                    }}
                ></Card>
            ))}
        </div>
    );
}

Cards.propTypes = {
    cards: PropTypes.array.isRequired,
    updateScore: PropTypes.func.isRequired,
};

export default Cards;
