import Card from "./Card.jsx";
import "../styles/Cards.css";

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

export default Cards;
