import { useEffect, useState } from "react";
import "../styles/App.css";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const pokemons = [];

        for (let i = 0; i < 5; i++) {
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
    }, []);

    return (
        <>
            {loaded
                ? cards.map((card) => (
                      <ul key={card.id}>
                          <li>
                              <img src={card.imgUrl} alt="" />
                          </li>
                          <li>{card.name}</li>
                          <li>{card.id}</li>
                      </ul>
                  ))
                : "Loading..."}
        </>
    );
}

export default App;
