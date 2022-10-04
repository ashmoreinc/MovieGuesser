import './index.css';
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

const api_endpoint = process.env.REACT_APP_MOVIES_API;

const ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const EMPTY_CHAR = "EMPTY"

// Get an input field to show the user.
const GetInputField = (arr) => {
    return <> {arr.map((letter, key) => {
        if (letter === EMPTY_CHAR) {
            return <span className={"letter empty"} key={key}></span>;
        } else if (letter == null) {
            return <span className={"letter"} key={key}></span>
        } else if (ALLOWED_CHARS.includes(letter)){
            return <span className={"letter"} key={key}>{letter}</span>
        } else {
            return <span className={"letter empty"} key={key}>{letter}</span>;
        }
    })} </>
}

// Get an formatted guess list for the start of the game
const EmptyGuessList = (string) => {
    return string.split('').map((letter) => {
        if (letter === " ") {
            return EMPTY_CHAR
        } else if (!ALLOWED_CHARS.split('').includes(letter)) {
            return letter
        } else {
            return null
        }
    })
}

const GetUsedLettersField = () => {
    return useLetters.map((letter, key) => {
        if(answer.includes(letter)) {
            return <span className={"letter correct"} key={key}>{letter}</span>
        } else {
            return <span className={"letter incorrect"} key={key}>{letter}</span>
        }
    })
}

// Check if the game is over
const isOver = () => {
    if(!gameStarted) {return false}
    for(let i=0; i<answer.length; i++) {
        if(guessed[i] !== EMPTY_CHAR && guessed[i] !== answer[i]) {
            return false;
        }
    }
    return true;
}

const resetGame = () => {
    gameStarted = false;
    answer = []
    guessed = []
    useLetters = []
    score = 26
}

// Game state
let gameStarted = false;

let answer = []
let guessed = []
let useLetters = []

let score = 26;

export default () => {
    // States
    const [InputField, setInputField] = useState(<p>Loading...</p>);
    const [UsedLettersField, setUsedLetters] = useState()
    const [ShowRules, SetShowRules] = useState();
    const [Score, SetScore] = useState(score);
    const [ShowGameOver, SetShowGameOver] = useState('hide')

    // Game functions
    const handleKeyPress = useCallback((event) => {
        // Check the game state

        if(!gameStarted) {
            console.log("wtf")
            SetShowGameOver('hide')
            return
        }

        if(isOver()) {
            SetShowGameOver('')
            return
        }

        // Check letter validity
        if(ALLOWED_CHARS.split('').includes(event.key)) {

            if(useLetters.includes(event.key)) {
                // Letter already used
            } else if (answer.includes(event.key)) {
                // New and correct letter
                for(let i=0; i<answer.length;i++){
                    if(answer[i] === event.key) {
                        guessed[i] = event.key
                    }
                }

                score -= 1;
                useLetters.push(event.key)
            } else {
                // New and Incorrect letter
                score -= 1;
                useLetters.push(event.key)
            }
        } else { // Invalid input
            console.log("Invalid Key")
        }

        // Update the game based on the new data
        setInputField(GetInputField(guessed))
        SetScore(score);
        setUsedLetters(GetUsedLettersField())
        if(isOver()) {
            SetShowGameOver('')
        }
    })

    // Initialisation functions
    const UpdateMovie = () => {
        fetch(api_endpoint, {
            mode: 'cors'
        }).then(r => r.json()).then(json => {
            answer = json["answer"].toLowerCase()
            guessed = EmptyGuessList(json["answer"])
            setInputField(GetInputField(guessed));
        })
    }

    const InitialiseGame = () => {
        resetGame()
        SetScore(score);
        SetShowGameOver('hide')
        UpdateMovie();
    }


    useEffect(() => {
        InitialiseGame()

        document.addEventListener("keydown", handleKeyPress, false);

        gameStarted = true
        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        };
    }, [])

    // Output
    return (
        <div className={"MovieGuesser"} onKeyDown={handleKeyPress}>
            <h1>Welcome to the movies game</h1>
            <hr/>
            <div className={"GameSection"}>
                <h1 className={ShowGameOver}>Game Over!</h1>
                <h2>Score: {Score}</h2>
                <div id={"rules"} className={ShowRules}>
                    <p>The aim of the game is to guess the movie.</p>
                    <p>You can type with your keyboard, if the letter is in the name, then the letters will display</p>
                    <p>Hints: You have 3 hints available. Each hint will affect your score.</p>

                    <button onClick={() => {
                        SetShowRules('hide')
                    }}>Close</button>
                </div>
                <div id={"inputField"}>
                        {InputField}
                </div>
                <div id={"usedLetters"}>
                    {UsedLettersField}
                </div>
            </div>
            <Link to={"/"}>Back</Link>
        </div>
    )
}