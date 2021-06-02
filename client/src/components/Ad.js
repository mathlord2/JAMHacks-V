import React from "react";
import WhiteContainer from "./WhiteContainer";

const Ad = props => {
    const buf = Buffer.from(props.image.file.data)
    const source = 'data:'+props.image.file.contentType+';base64,' + buf.toString('base64');
    return (
        <WhiteContainer onClick={props.onClick}>
            <h2>{props.title}</h2>
            <img src={source} alt={props.name} style={{width: "80%"}}/>
        </WhiteContainer>
    )
}

export default Ad;