import Tilt from "react-parallax-tilt";
import "../styles/Card.css";

function Card({ imgUrl, name, updateScore }) {
    return (
        <Tilt tiltReverse={true} glareEnable={true}>
            <button className="card" onClick={updateScore}>
                <div className="card-img">
                    <img src={imgUrl} alt="" />
                </div>
                <div className="card-name">{name}</div>
            </button>
        </Tilt>
    );
}

export default Card;
