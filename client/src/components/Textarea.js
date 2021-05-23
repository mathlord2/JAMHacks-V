import React from "react";

const Textarea = props => {
    return (
        <textarea placeholder={props.placeholder} value={props.value} onChange={props.onChange} style={{
            padding: "10px",
            border: "3px solid #0a7040",
            borderRadius: "15px",
            textAlign: "left",
            width: props.width,
            height: props.height,
            boxShadow: "2px 2px 10px black"
        }}/>
    );
}

export default Textarea;