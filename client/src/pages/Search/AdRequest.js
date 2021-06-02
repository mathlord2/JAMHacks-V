import React from "react";
import WhiteContainer from "../../components/WhiteContainer";
import Button from "../../components/Button";
import Textarea from "../../components/Textarea";
import Material from "../../components/Material";

import {GrClose} from "react-icons/gr";
import "./Search.css";

export default class AdRequest extends React.Component {
    state = {
        message: ""
    }

    returnDate = (date) => {
        date = new Date(date);
        let month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[month];
        return month + " " + day + ", " + year;
    }

    onChange = e => {
        this.setState({message: e.target.value});
    }

    render() {
        return (
            <WhiteContainer>
                <div className="close" onClick={this.props.closeAd}><GrClose/></div>
                <h1>{this.props.ad.name}</h1>
    
                <div className="imageRow">
                    <img src={this.props.ad.image.name} alt={this.props.ad.name} className="popupImage"/>
                    <div className="text">
                        <h3>{this.props.ad.description}</h3>
                        <br/>
                        <h3><b>Name of Vendor:</b> {this.props.ad.vendor}</h3>
                        <h3><b>Vendor Email:</b> {this.props.ad.email}</h3>
                        <h3><b>Pickup Location:</b> {this.props.ad.location}</h3>
                        <h3><b>Date Posted:</b> {this.returnDate(this.props.ad.date)}</h3>
                        <h3><b>Category:</b> {this.props.ad.category}</h3>
                        <h3><b>Materials:</b></h3>
                        {this.props.ad.materials.map(m => <Material text={m} key={m}/>)}
                    </div>
                </div>
                
                <Textarea placeholder="Request message" value={this.state.message}
                    onChange={this.onChange} width="100%" height={100}/>
                <Button text="Request" margin="20px 0px" disabled={this.state.message === ""} onClick={this.props.closeAd}/>
            </WhiteContainer>
        );
    }
    
}