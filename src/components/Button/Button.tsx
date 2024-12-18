import React from "react";
import './Button.css';

interface ButtonProps{
    label: string;
}

const Button = ({label}: ButtonProps) =>{
    return <button className="button">{label}</button>

}

export default Button;