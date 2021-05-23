import React from "react";

const Material = props => {
    const isSustainable = () => {
        const material = props.text;
        const sustainableMaterials = ["Glass", "Aluminium Alloy", "Aluminum Alloy", "Stainless Steel"];
        
        for (let i = 0; i < sustainableMaterials.length; i++) {
            if (sustainableMaterials[i].toLowerCase().includes(material.toLowerCase())) {
                return true;
            }
        }
        
        return false;
    }

    return (
        <span style={{
            borderRadius: "20px",
            backgroundColor: isSustainable() ? "#0a7040" : "red",
            boxShadow: "2px 2px 10px black",
            color: "white",
            fontSize: props.size,
            padding: props.padding ? props.padding : "10px 20px",
            border: "none",
            width: props.width ? props.width : "inherit",
            margin: props.margin ? props.margin : 0,
        }}>
            {props.text}
        </span>
    );
}

export default Material;