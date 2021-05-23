import React from "react";

const Button = props => {
    return (
        <button onClick={props.onClick} style={{
            borderRadius: "20px",
            backgroundColor: props.background ? props.background : "#0a7040",
            boxShadow: "2px 2px 10px black",
            color: "white",
            fontSize: props.size,
            padding: props.padding ? props.padding : "10px 20px",
            border: "none",
            margin: props.margin ? props.margin : 0,
            opacity: props.disabled ? 0.5 : 1
        }} disabled={props.disabled}>
            {props.text}
        </button>
    );
}

export default Button;