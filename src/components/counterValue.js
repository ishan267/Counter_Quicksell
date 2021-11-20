import React from "react";

function CounterValue(props){

    return(
        <div class="counterValueContainer">
            Counter Value: {props.counter}
        </div>
    )
}

export default CounterValue;