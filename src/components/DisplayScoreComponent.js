import React, {Component} from "react";
import "./DisplayScoreComponent.css"

class DisplayScoreComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"DisplayScoreComponent"}>
                <div>{this.props.displayName}</div>
                <div>{this.props.displayValue}</div>
            </div>
        )
    }
}


export default DisplayScoreComponent;