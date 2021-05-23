import React from "react";

import Textbox from "../../components/Textbox";
import Button from "../../components/Button";

import "./Login.css";

export default class Login extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        login: true
    }

    changeName = e => {
        this.setState({name: e.target.value});
    }

    changeEmail = e => {
        this.setState({email: e.target.value});
    }

    changePassword = e => {
        this.setState({password: e.target.value});
    }

    changeComfirmPassword = e => {
        this.setState({confirmPassword: e.target.value});
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            login: !prevState.login
        }));
    }

    render() {
        return (
            <div id="authentication">
                <h1>{this.state.login ? "Login" : "Signup"}</h1>

                {!this.state.login && 
                <div className="loginRow">
                    <h2>Name</h2>
                    <Textbox placeholder="Name" value={this.state.name} onChange={this.changeName} type="name"/>
                </div>}
                    
                <div className="loginRow">
                    <h2>Email</h2>
                    <Textbox placeholder="Email" value={this.state.email} onChange={this.changeEmail} type="email"/>
                </div>

                <div className="loginRow">
                    <h2>Password</h2>
                    <Textbox placeholder="Password" value={this.state.password} onChange={this.changePassword} type="password"/>
                </div>

                {!this.state.login &&
                <div className="loginRow">
                    <h2>Email</h2>
                    <Textbox placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.changeComfirmPassword} type="password"/>
                </div>}
            
                <h3 style={{cursor: "pointer"}} onClick={this.toggleLogin}>{this.state.login ? "New user?" : "Already have an account?"}</h3>
            
                <Button onClick={this.state.login ? this.props.login : this.props.signup} text={this.state.login ? "Login" : "Signup"}/>
            </div>
        );
    }
}