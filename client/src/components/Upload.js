import React from "react";
import {BsCloudUpload} from "react-icons/bs";

const Upload = props => {
    return (
        <div style={{margin: "15px 0px"}}>
            <BsCloudUpload style={{position: "absolute", marginLeft: "10px", fontSize: "20px"}}/>
            <input type="file" id="button" hidden onChange={props.onChange} accept={props.accept}/>
            <label for="button" style={{
                padding: "10px",
                paddingLeft: "35px",
                border: "3px solid #0D3A62",
                borderRadius: "15px",
                textAlign: "left",
                width: props.width,
                height: props.height,
                marginRight: "10px",
                boxShadow: "2px 2px 10px black"
            }}>{props.text}</label>
            <span id="file-chosen">{!props.file ? "No file chosen" : props.file.name}</span>
        </div>
    );
}

export default Upload;