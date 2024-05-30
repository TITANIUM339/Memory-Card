import Card from "./Card.jsx";
import "../styles/Cards.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// https://stackoverflow.com/a/2450976
function shuffle(unShuffledArray) {
    const array = JSON.parse(JSON.stringify(unShuffledArray));

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function Cards({ cards, updateScore }) {
    const [clickedCards, setClickedCards] = useState([]);
    const [shuffledCards, setShuffledCards] = useState(cards);

    useEffect(() => {
        const flipToBackKeyframes = [
            { pointerEvents: "none" },
            { transform: "rotateY(180deg)", pointerEvents: "none" },
        ];

        const flipToBackOptions = {
            duration: 750,
            iterations: 1,
            fill: "forwards",
        };

        const flipToFrontKeyframes = [
            { transform: "rotateY(0deg)", pointerEvents: "all" },
        ];

        const flipToFrontOptions = {
            duration: 750,
            iterations: 1,
            fill: "forwards",
        };

        const cardElements = document.querySelectorAll(".card");

        cardElements.forEach((card) => {
            card.animate(flipToBackKeyframes, flipToBackOptions).finished.then(
                () => {
                    card.animate(flipToFrontKeyframes, flipToFrontOptions);
                    setShuffledCards(shuffle(shuffledCards));
                },
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedCards]);

    return (
        <div className="cards">
            {shuffledCards.map((card) => (
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
