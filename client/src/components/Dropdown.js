import React from "react";

import {Menu, Dropdown as Drop} from "antd";
import {BiCaretDown} from "react-icons/bi";

const Dropdown = props => {
    const menu = (
        <Menu>
            {props.items.map(item => (
                <Menu.Item onClick={() => props.setValue(item)} key={item}>
                    {item}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Drop overlay={menu}>
            <div style={{
                padding: "10px",
                border: "3px solid #0a7040",
                borderRadius: "15px",
                textAlign: "left",
                width: props.width,
                height: props.height,
                marginRight: props.marginRight,
                marginBottom: "20px",
                boxShadow: "2px 2px 10px black"
            }}>
                {props.value === "" ? props.default : props.value}
                <BiCaretDown size={20} style={{marginLeft: "5px"}}/>
            </div>
        </Drop>
    );
}

export default Dropdown;