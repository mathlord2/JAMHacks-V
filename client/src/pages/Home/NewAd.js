import React from "react";

import WhiteContainer from "../../components/WhiteContainer";
import Button from "../../components/Button";
import Textbox from "../../components/Textbox";
import Textarea from "../../components/Textarea";
import Upload from "../../components/Upload";
import Dropdown from "../../components/Dropdown";

import {GrClose} from "react-icons/gr";
import moment from "moment";

import "./Home.css";

export default class NewAd extends React.Component {
    state = {
        name: "",
        image: null,
        description: "",
        category: "",
        location: "",
        date: moment().format("YYYY-MM-DD"),
        disabled: true
    }

    returnDate = (date) => {
        let month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[month];
        return month + " " + day + ", " + year;
    }

    checkDisabled = () => {
        if (this.state.name === "" || this.state.description === "" || this.state.location === ""){
            this.setState({disabled: true});
        } else {
            this.setState({disabled: false});
        }
    }

    changeName = e => {
        this.setState({name: e.target.value});
        this.checkDisabled();
    }

    changeImage = e => {
        this.setState({image: e.target.files[0]});
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    changeDescription = e => {
        this.setState({description: e.target.value});
        this.checkDisabled();
    }

    changeCategory = category => {
        this.setState({category});
    }
    
    changeLocation = e => {
        this.setState({location: e.target.value});
        this.checkDisabled();
    }

    addAd = () => {
        const image = {...this.state.image, name: URL.createObjectURL(this.state.image)};
        this.props.addAd(this.state.name, image, this.state.description, this.state.category, this.state.location, this.state.date);
        this.props.closeAd();
    }

    render() {
        return (
            <WhiteContainer>
                <div className="close" onClick={this.props.closeAd}><GrClose/></div>
                <h1>Create New Ad</h1>

                <div className="formRow">
                    <h3>Device Name</h3>
                    <Textbox width="30%" placeholder="Name" onChange={this.changeName} value={this.state.name}/>
                </div>

                <div className="formRow">
                    <h3>Image of Device</h3>
                    <Upload text="Upload image" onChange={this.changeImage} file={this.state.image} accept=".png, .jpg"/>
                </div>
                
                <div className="formRow">
                    <h3>Description of Device</h3>
                    <Textarea placeholder="Description" onChange={this.changeDescription}
                    value={this.state.description} width="80%" height={200}/>
                </div>

                <div className="formRow">
                    <h3>Device Category</h3>
                    <Dropdown default="Select category" width="10%"
                    items={["Phone", "Computer", "Tablet", "Furniture", "Other"]}
                    value={this.state.category} setValue={this.changeCategory}/>
                </div>
                
                <div className="formRow">
                    <h3>Pickup Location</h3>
                    <Textbox width="30%" placeholder="Street address, city, province/state, postal code"
                    onChange={this.changeLocation} value={this.state.location}/>
                </div>

                <Button text="Submit" disabled={this.state.disabled} onClick={this.addAd}/>
            </WhiteContainer>
        );
    }
    
}