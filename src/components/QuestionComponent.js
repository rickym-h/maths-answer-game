import React, {Component} from "react";
import "./QuestionComponent.css"
import LoadingBar from "./LoadingBar";

class QuestionComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        // todo determine timer length based on score and difficulty
    }

    // generate a question based on difficulty
    generateQuestion = () => {
        // Format: N=Number - O-Operation
        // Easy: N O N
        // Medium: N O N O N
        // Hard: N O N O N O N

        // Generate a set of random numbers for the question.
        let nums = [];
        for (let i = 0; i < this.props.difficulty + 2; i++) {
            // Currently numbers go up to 9 - make harder difficulties go higher?
            nums.push(1+Math.floor(Math.random() * 9))
        }

        // Generate a set of operations to use on those numbers. Must be one less because there is always one operator
        // less than there are numbers.
        let possibleOps = ['+','-','*','/'];
        let ops = [];
        for (let i = 0; i < nums.length-1; i++) {
            if (ops[ops.length-1] === '/') {
                let myPossibleOps = ['+','-','*'];
                ops.push(myPossibleOps[Math.floor(Math.random()*3)])
            } else {
                ops.push(possibleOps[Math.floor(Math.random()*4)])
            }
        }

        // Generate the question by alternating pushing the numbers and the operations.
        let question = [];
        for (let i = 0; i < nums.length; i++) {
            if (ops[i] === undefined) {
                // Special case at end because in the last iteration, there is no extra operation.
                question.push(nums[i])
            } else {
                question.push(nums[i])
                question.push(ops[i])
            }
        }
        return question;
    }

    // generate possible answers
    generateAnswersFromQuestion = (question) => {
        // return an array of numbers, the first of which will be the correct answer
        let NUM_OF_FAKE_ANSWERS = this.props.difficulty + 1;

        let answers = [];

        let questionAsString = question.join("");
        let trueAnswer=this.evaluateMathsEquation(questionAsString);
        answers.push(trueAnswer)

        for (let i = 0; i < NUM_OF_FAKE_ANSWERS; i++) {
            // create new random representation of string
            let copiedQ = [...question];
            for (let j = 1; j < copiedQ.length; j+=2) {
                let possibleOps = ['+','-','*','/'];
                possibleOps = possibleOps.filter(x=>{return x!==copiedQ[j]})
                copiedQ[j] = possibleOps[Math.floor(Math.random()*3)];
            }

            // eval that string and push to answers
            answers.push(this.evaluateMathsEquation(copiedQ.join("")))
        }

        return answers;
    }

    // Takes a string and returns the answer of the equation represented as a string
    // in the format of 2dp with truncated zeroes.
    evaluateMathsEquation = (equationAsString) => {
        // eslint-disable-next-line no-new-func
        let ans = Function(`return(${equationAsString})`)();
        return parseFloat(ans.toFixed(2));
    }

    // Function to shuffle an array in place
    shuffle = (array) =>  {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // Checks whether an answer is valid or not and calls the necessary props functions
    // Also removes a provided timer (so old timers do not continue)
    submitAnswer = (question, val, timerToReset) => {
        clearTimeout(timerToReset)
        if (this.evaluateMathsEquation(question) === val) {
            console.log("CORRECT")
            this.props.submittedCorrectAnswer()
        } else {
            console.log("WRONG")
            this.props.gameOver()
        }
    }

    // Function to run if the user runs out of time
    timeRunOut = () => {
        console.log("RAN OUT OF TIME")
        this.props.gameOver()
    }

    // Function to calculate how much time should be given for a new question based on the score and difficulty
    getTimeForQuestionMilisconds = (score, difficulty) => {
        // get initial time for a given difficulty
        difficulty = 5 + (difficulty * 3)
        let multiplier = Math.pow(0.95, score)
        return Math.floor(difficulty * multiplier * 1000)
    }

    render() {
        // Generate a question and some answers for it. Extracts the actual answer - and then shuffles the answers
        // Also creates the question in a readable format for the user from the array representation.
        let question = this.generateQuestion();
        let answers = this.generateAnswersFromQuestion(question);
        let trueAns = answers[0]
        // Format the question and answers in a way to be rendered
        this.shuffle(answers);
        question = question.join("")


        // Calculate how much time should be allowed for the player to answer a question
        let timerSeconds = this.getTimeForQuestionMilisconds(this.props.score, this.props.difficulty);

        // Create timer to countdown for the player
        let myTimer;

        myTimer = setTimeout(this.timeRunOut, timerSeconds)

        return (
            <div className={"QuestionComponent"}>
                QUESTION: {question}
                <br/>
                <div className={"answerButtonContainer"}>
                    {
                        answers.map((ans,i) => {
                            let val = ans;
                            return (
                                <button
                                    key = {i}
                                    className={"answerButton"}
                                    onClick={() => this.submitAnswer(question, val, myTimer)}
                                >
                                    {val}
                                </button>
                            )

                        })
                    }
                </div>
                <br/>
                <LoadingBar
                    key={this.props.score}
                    miliseconds={timerSeconds}
                />
            </div>
        )

    }
}

export default QuestionComponent;