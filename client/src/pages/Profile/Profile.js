import React from "react";
import {Link} from "react-router-dom";

import Button from "../../components/Button";

import "./Profile.css";

export default class Profile extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="page">
                <h1>Profile</h1>

                <div id="profile">
                    <h2>{this.props.user.name}</h2>
                    <h2>{this.props.user.email}</h2>
                </div>

                <Link to="/">
                    <Button text="Logout" onClick={this.props.logout}/>
                </Link>
            </div>
        );
    }
}