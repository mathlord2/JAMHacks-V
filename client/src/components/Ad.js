import React from "react";
import WhiteContainer from "./WhiteContainer";

const Ad = props => {
    return (
        <WhiteContainer onClick={props.onClick}>
            <h2>{props.name}</h2>
            <img src={props.image.name} alt={props.name} style={{width: "80%"}}/>
        </WhiteContainer>
    )
}

export default Ad;