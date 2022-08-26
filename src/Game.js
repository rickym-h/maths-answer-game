import React, {Component} from "react";
import "./Game.css"
import QuestionComponent from "./components/QuestionComponent";
import DisplayScoreComponent from "./components/DisplayScoreComponent";

// function storageAvailable(type) {
//     let storage;
//     try {
//         storage = window[type];
//         const x = '__storage_test__';
//         storage.setItem(x, x);
//         storage.removeItem(x);
//         return true;
//     }
//     catch (e) {
//         return e instanceof DOMException && (
//                 // everything except Firefox
//                 e.code === 22 ||
//                 // Firefox
//                 e.code === 1014 ||
//                 // test name field too, because code might not be present
//                 // everything except Firefox
//                 e.name === 'QuotaExceededError' ||
//                 // Firefox
//                 e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             (storage && storage.length !== 0);
//     }
// }

class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        // Initialise high scores
        let highScores = [0,0,0]

        // if (storageAvailable('localStorage')) {
        //     if (localStorage.getItem("highScores") !== null) {
        //         highScores = JSON.parse(localStorage.getItem("highScores"));
        //     }
        // }


        this.state = {
            currentlyPlaying: false,
            score: 0,
            difficulty: 0,
            highScores: highScores
        }
    }

    // Changes the difficulty based on a click event
    onDifficultyChange = (ev) => {
        this.setState({
            difficulty: Number(ev.target.value),
        })
    }

    // Initialise the game and set the currentlyPlaying state to render the actual game interface
    startGame = () => {
        console.log("STARTING GAME")
        this.setState({
            currentlyPlaying: true,
            score: 0,
        })
    }

    incrementScore = () => {
        this.setState({
            score: this.state.score+1,
        })
    }

    gameOver = () => {
        let currentHighScores = this.state.highScores;
        currentHighScores[this.state.difficulty] = Math.max(this.state.score, currentHighScores[this.state.difficulty]);

        alert("GAME OVER\nScore: "+this.state.score)

        this.setState({
            currentlyPlaying: false,
            highScores: currentHighScores,
        })
    }

    render() {
        // todo replace dev button with a question element which will ask a question with a timer, given difficulty and score
        // todo if the question is answered, rerender
        // todo if the timer runs out, show an end game screen and set currentlyPlaying to false
        if (this.state.currentlyPlaying) {
            // Game is being played - show game.
            return (
                <div className={"Game"}>
                    Solve the question!
                    <br/>
                    Score: {this.state.score}
                    <br/>
                    <QuestionComponent
                        score={this.state.score}
                        difficulty={this.state.difficulty}

                        submittedCorrectAnswer={this.incrementScore}
                        gameOver={this.gameOver}
                    />
                </div>
            )
        } else {
            // Game is not being played - show difficulty selector.
            return (
                <div className={"Game"}>
                    <div className={"highScoreContainer"}>
                        <DisplayScoreComponent displayName={"Easy"} displayValue={this.state.highScores[0]}/>
                        <DisplayScoreComponent displayName={"Medium"} displayValue={this.state.highScores[1]}/>
                        <DisplayScoreComponent displayName={"Hard"} displayValue={this.state.highScores[2]}/>
                    </div>
                    Select difficulty:
                    <form onChange={this.onDifficultyChange}>
                        <input name={"diff"} type={"radio"} id={0} value={0} defaultChecked/>
                        <label htmlFor={0}> Easy </label>
                        <input name={"diff"} type={"radio"} id={1} value={1}/>
                        <label htmlFor={1}> Medium </label>
                        <input name={"diff"} type={"radio"} id={2} value={2}/>
                        <label htmlFor={2}> Hard </label>
                    </form>
                    <button onClick={this.startGame}> Start Game! </button>
                </div>
            );
        }
    }
}

export default Game;