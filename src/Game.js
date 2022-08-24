import React, {Component} from "react";
import "./Game.css"
import QuestionComponent from "./components/QuestionComponent";

class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            currentlyPlaying: false,
            score: 0,
            difficulty: 0,
        }
    }

    onDifficultyChange = (ev) => {
        this.setState({
            difficulty: Number(ev.target.value),
        })
    }

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
        console.log("GAME OVER")
        console.log("Score: " + this.state.score)
        // todo show an alert of some kind
        // todo set currentlyPlaying to false
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
                    <button onClick={this.incrementScore}>DEVELOPMENT BUTTON</button>
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