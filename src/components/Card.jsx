import Tilt from "react-parallax-tilt";
import "../styles/Card.css";
import PropTypes from "prop-types";

function Card({ imgUrl, name, updateScore }) {
    return (
        <Tilt tiltReverse={true} glareEnable={true}>
            <button className="card" onClick={updateScore}>
                <div className="card-front">
                    <div className="card-img">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="card-name">{name}</div>
                </div>
                <div className="card-back">
                    <img src="./pokeball.svg" alt="" />
                </div>
            </button>
        </Tilt>
    );
}

Card.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
};

export default Card;
