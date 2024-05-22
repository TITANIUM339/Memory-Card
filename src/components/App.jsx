import { useEffect, useState } from "react";
import "../styles/reset.css";
import "../styles/App.css";
import Cards from "./Cards.jsx";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState({score: 0, highScore: 0});
    const [level, setLevel] = useState(1);

    useEffect(() => {
        const pokemons = [];

        for (let i = 0; i < 3 * level; i++) {
            pokemons.push(
                fetch(
                    `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 649)}/`,
                    { mode: "cors" },
                ).then((response) => response.json()),
            );
        }

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

    function updateScore() {
        console.log("click");
    }

    return (
        <>
            <main>
                <div className="info">
                    <div>SCORE: {score.score}</div>
                    <div>HIGH SCORE: {score.highScore}</div>
                    <div>CARDS LEFT: {score.score - 3 * (level - 1)}/{3 * level}</div>
                </div>
                {loaded ? (
                    <Cards cards={cards} updateScore={updateScore}></Cards>
                ) : (
                    "Loading..."
                )}
            </main>
        </>
    );
}

export default App;
