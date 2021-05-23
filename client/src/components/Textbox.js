import React from "react";

const Textbox = props => {
    return (
        <input placeholder={props.placeholder} value={props.value} onChange={props.onChange} type={props.type} style={{
            padding: "10px",
            border: "3px solid #0a7040",
            borderRadius: "15px",
            textAlign: "left",
            width: props.width,
            height: props.height,
            marginRight: props.margin,
            boxShadow: "2px 2px 10px black"
        }}/>
    );
}

export default Textbox;