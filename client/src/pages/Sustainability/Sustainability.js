import React from "react";

import Button from "../../components/Button";
import Searchbox from "../../components/Searchbox";
import Material from "../../components/Material";

import "./Sustainability.css";

export default class Sustainability extends React.Component {
    state = {
        input: "",
        materials: ["Gold", "Aluminum", "Glass"],
        sustainable: true,
        searched: false
    }

    search = () => {
        this.isSustainable();

        this.setState({
            searched: true
        });
    }

    reset = () => {
        this.setState({
            input: "",
            materials: [],
            sustainable: true,
            searched: false
        })
    }

    changeInput = e => {
        this.setState({input: e.target.value});
    }

    isSustainable = () => {
        let counter = 0;
        const sustainableMaterials = ["Glass", "Aluminum Alloy", "Stainless Steel"];
        
        for (let i = 0; i < this.state.materials.length; i++) {
            for (let j = 0; j < sustainableMaterials.length; j++) {
                if (sustainableMaterials[j].toLowerCase().includes(this.state.materials[i].toLowerCase())) {
                    counter++;
                    break;
                }
            }
        }
        
        if (counter/this.state.materials.length >= 0.5) {
            this.setState({sustainable: true});
        } else {
            this.setState({sustainable: false});
        }
    }

    render() {
        return (
            <div className="page">
                <div className="searchRow">
                    <Searchbox placeholder="Lookup sustainability info of a device"
                    value={this.state.input} onChange={this.changeInput} width="400px"/>
                    <Button text="Search" onClick={this.search}/>
                </div>

                <p style={{
                    margin: "1vh 0px 5vh 0px",
                    cursor: "pointer"
                }} onClick={this.reset}>Reset</p>
                
                {!this.state.searched ?
                <h1 style={{marginTop: "40vh"}}>Use the search bar above to look up sustainability information about any device!</h1>
                : <div className="info">
                    <h1><b>Device:</b> {this.state.input}</h1>
                    <h1>Materials:</h1>
                    {this.state.materials.map(m => <Material text={m} key={m} width="10%"/>)}
                    <h1 style={{
                        color: this.state.sustainable ? "#0a7040" : "red"
                    }}>{this.state.sustainable ? "Sustainable" : "Not Sustainable"}</h1>
                </div>}
            </div>
        );
    }
}