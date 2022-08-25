import React, {Component} from "react";

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
            ops.push(possibleOps[Math.floor(Math.random()*4)])
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

    evaluateMathsEquation = (equationAsString) => {
        // eslint-disable-next-line no-new-func
        let ans = Function(`return(${equationAsString})`)();
        return ans.toPrecision(3);
    }



    render() {
        let question = this.generateQuestion();
        console.log(question)
        let answers = this.generateAnswersFromQuestion(question);
        console.log(answers)
        return (
            <div>
                QUESTION:
            </div>
        )

    }
}

export default QuestionComponent;