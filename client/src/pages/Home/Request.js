import React from "react";
import Button from "../../components/Button";

const Request = props => {
    const returnDate = (date) => {
        let month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[month];
        return month + " " + day + ", " + year;
    }

    return (
        <div className="request">
            <h3>{props.name} ({props.email})</h3>
            <h4>{returnDate(props.dateRequested)}</h4>
            <h4>{props.message}</h4>
            <Button text="Accept Request"/>
        </div>
    );
}

export default Request;