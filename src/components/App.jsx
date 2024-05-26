import { useEffect, useState } from "react";
import "../styles/reset.css";
import "../styles/App.css";
import Cards from "./Cards.jsx";
import loadingIcon from "../assets/loading.svg";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState({ score: 0, highScore: 0 });
    const [level, setLevel] = useState(1);
    const [cardsLeft, setCardsLeft] = useState(0);

    const numberOfCards = 3;

    useEffect(() => {
        const ids = [];

        do {
            const id = Math.ceil(Math.random() * 649);

            if (!ids.includes(id)) ids.push(id);
        } while (ids.length < numberOfCards * level);

        const pokemons = [];

        for (let i = 0; i < numberOfCards * level; i++) {
            pokemons.push(
                fetch(`https://pokeapi.co/api/v2/pokemon/${ids[i]}/`, {
                    mode: "cors",
                }).then((response) => response.json()),
            );
        }

        setLoaded(false);

        Promise.all(pokemons)
            .then((data) => {
                setCards(
                    data.map(
                        ({
                            sprites: {
                                other: {
                                    dream_world: { front_default: imgUrl },
                                },
                            },
                            name,
                            id,
                        }) => {
                            return { imgUrl, name, id };
                        },
                    ),
                );
                setLoaded(true);
            })
            .catch(() =>
                alert("An Error has ocurred. Try refreshing the page."),
            );
    }, [level]);

    function updateScore(option) {
        if (option === "reset") {
            setScore({...score, score: 0});
            setLevel(1);
            setCardsLeft(0);
            return;
        }

        const newScore = score.score + 1;
        const newCardsLeft = cardsLeft + 1;

        setScore({
            score: newScore,
            highScore: newScore > score.highScore ? newScore : score.highScore,
        });

        setCardsLeft(newCardsLeft);

        if (newCardsLeft === numberOfCards * level) {
            setLevel(level + 1);
            setCardsLeft(0);
        }
    }

    return (
        <>
            <main>
                <div className="info">
                    <div>SCORE: {score.score}</div>
                    <div>HIGH SCORE: {score.highScore}</div>
                    <div>
                        CARDS LEFT: {cardsLeft}/{numberOfCards * level}
                    </div>
                </div>
                {loaded ? (
                    <Cards cards={cards} updateScore={updateScore}></Cards>
                ) : (
                    <div className="loading">
                        <img src={loadingIcon} alt="loading" />
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
