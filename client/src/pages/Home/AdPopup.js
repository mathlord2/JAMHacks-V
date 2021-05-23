import React from "react";
import WhiteContainer from "../../components/WhiteContainer";
import {GrClose} from "react-icons/gr";

import Button from "../../components/Button";
import Material from "../../components/Material";

import Request from "./Request";
import "./Home.css";

export default class AdPopup extends React.Component {
    state = {
        openRequests: false
    }

    returnDate = (date) => {
        let month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[month];
        return month + " " + day + ", " + year;
    }

    render() {
        return (
            <WhiteContainer>
                <div className="close" onClick={this.props.closeAd}><GrClose/></div>
                <h1>{this.props.ad.name}</h1>
    
                <div className="imageRow">
                    <img src={this.props.ad.image.name} alt={this.props.ad.name} className="popupImage"/>
                    <div className="text">
                        <h3>{this.props.ad.message}</h3>
                        <br/>
                        <h3><b>Location:</b> {this.props.ad.location}</h3>
                        <h3><b>Date Posted:</b> {this.returnDate(this.props.ad.date)}</h3>
                        <h3><b>Category:</b> {this.props.ad.category}</h3>
                        <h3><b>Materials:</b></h3>
                        {this.props.ad.materials.map(m => <Material text={m} key={m}/>)}
                    </div>
                </div>
    
                {this.state.openRequests ?
                    <div>
                        <h2>Requests:</h2>
                        {this.props.ad.requests.map(request => <Request {...request}/>)}
                    </div>
                : <Button text="View Requests" onClick={() => {
                    this.setState({openRequests: true});
                }}/>}
                
            </WhiteContainer>
        );
    }
    
}