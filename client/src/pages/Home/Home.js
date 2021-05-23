import React from "react";
import Button from "../../components/Button";
import Ad from "../../components/Ad";

import AdPopup from "./AdPopup";
import NewAd from "./NewAd";

import "./Home.css";
import moment from "moment";

export default class Home extends React.Component {
    state = {
        displayAdPopup: false,
        displayNewAd: false,
        currentAd: {}
    }

    displayAd = ad => {
        this.setState({
            displayAdPopup: true,
            currentAd: ad
        });
    }

    closeAd = () => {
        this.setState({displayAdPopup: false});
    }

    toggleNewAd = () => {
        this.setState(prevState => ({
            displayNewAd: !prevState.displayNewAd
        }));
    }

    render() {
        return (
            <div className="page">
                <h1>Your Ads</h1>
                <div style={{position: "absolute", right: 30, top: 75}}>
                    <Button text="+ New Ad" onClick={this.toggleNewAd}/>
                </div>

                <div className="ads">
                    {this.props.ads.map(ad => (
                        <Ad {...ad} onClick={() => this.displayAd(ad)}/>
                    ))}
                </div>

                {this.state.displayAdPopup && 
                <div className="overlay">
                    <AdPopup ad={this.state.currentAd} closeAd={this.closeAd}/>
                </div>
                }

                {this.state.displayNewAd &&
                <div className="overlay">
                    <NewAd closeAd={this.toggleNewAd} addAd={this.props.addAd}/>
                </div>
                }
            </div>
        );
    }
}