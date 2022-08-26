import React, {Component} from "react";
import "./DisplayScoreComponent.css"

class DisplayScoreComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        let displayName = "Score";
        let displayValue = 0;

        if (this.props.displayName !== undefined) {
            displayName = this.props.displayName;
        }

        if (this.props.displayValue !== undefined) {
            displayValue = this.props.displayValue;
        }

        this.state = {
            name: displayName,
            value: displayValue
        }

    }

    render() {
        return (
            <div className={"DisplayScoreComponent"}>
                <div>{this.state.name}</div>
                <div>{this.state.value}</div>
            </div>
        )
    }
}


export default DisplayScoreComponent;