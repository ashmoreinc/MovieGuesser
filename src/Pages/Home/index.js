import './index.css';
import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className="StartScreen">

            <h1>Welcome to guessertainer</h1>
            <hr/>
            <p>What would you like to play?</p>

            <ul className="games-list">
                <li><Link to={"/Movies"}><button>Movies</button></Link></li>
                <li><Link to={"/Songs"}><button>Songs</button></Link></li>
            </ul>


        </div>
    );
};