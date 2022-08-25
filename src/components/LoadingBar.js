import React, {Component} from "react";

class LoadingBar extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            timerLength: this.props.miliseconds
        }
    }

    render() {
        let myStyle = {
            animation: `fill ${this.state.timerLength / 1000}s linear 1`
        }
        console.log("RESTARTING")

        return (
            <div className={"bar"}>
                <div className={"in"} style={myStyle}></div>
            </div>
        )
    }

}

export default LoadingBar;