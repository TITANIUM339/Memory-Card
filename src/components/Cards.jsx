import Card from "./Card.jsx";
import "../styles/Cards.css";
import PropTypes from "prop-types";

function Cards({ cards, updateScore }) {
    return (
        <div className="cards">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    imgUrl={card.imgUrl}
                    name={card.name}
                    updateScore={updateScore}
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
