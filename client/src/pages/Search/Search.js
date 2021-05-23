import React from "react";

import Searchbox from "../../components/Searchbox";
import Dropdown from "../../components/Dropdown";
import Ad from "../../components/Ad";
import AdRequest from "./AdRequest";

import {Checkbox} from "antd";

import moment from "moment";
import "./Search.css";

export default class Search extends React.Component {
    state = {
        filteredAds: [],
        input: "",
        category: "",
        currentAd: {},
        searchClosest: false,
        displayPopup: false
    }

    componentDidMount() {
        this.setState({filteredAds: this.props.ads});
    }

    changeCategory = category => {
        this.setState({category});
        this.filterResults(this.state.input, category);
    }

    changeInput = e => {
        this.setState({input: e.target.value});
        this.filterResults(e.target.value, this.state.category);
    }

    filterResults = (input, category) => {
        if (input === "" && category === "") {
            this.setState({filteredAds: this.props.ads});
        } else {
            const filteredAds = this.props.ads.filter(ad => (ad.name.toLowerCase().includes(input.toLowerCase()) || ad.description.toLowerCase().includes(input.toLowerCase())) && (ad.category === category || category === ""));
            this.setState({filteredAds});
        }
    }

    displayAd = ad => {
        this.setState({
            displayPopup: true,
            currentAd: ad
        });
    }

    closeAd = () => {
        this.setState({displayPopup: false});
    }

    toggleCheckClosest = () => {
        this.setState(prevState => ({
            searchClosest: !prevState.searchClosest
        }));
    }

    reset = () => {
        this.setState({
            filteredAds: this.props.ads,
            input: "",
            category: "",
            searchClosest: false
        });
    }

    render() {
        return (
            <div className="page">
                <Searchbox placeholder="Search for devices"
                value={this.state.input} onChange={this.changeInput}/>

                <div className="row">
                    <Dropdown default="Filter by category"
                    items={["Phone", "Computer", "Tablet", "Furniture", "Other"]}
                    value={this.state.category} setValue={this.changeCategory} marginRight={40}/>
                    <Checkbox checked={this.state.searchClosest} onChange={this.toggleCheckClosest}/>
                    <h2 style={{marginLeft: 10}}>Devices nearby</h2>
                </div>

                <p style={{cursor: "pointer"}} onClick={this.reset}>Reset</p>

                <div className="ads">
                    {this.state.filteredAds.map(ad => <Ad {...ad} onClick={() => this.displayAd(ad)}/>)}
                </div>

                {this.state.displayPopup &&
                <div className="overlay">
                    <AdRequest ad={this.state.currentAd} closeAd={this.closeAd}/>    
                </div>}
            </div>
        );
    }
}