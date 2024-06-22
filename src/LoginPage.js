import React from "react";
import './LoginPage.css';

export default function LoginPage() {
    return (
        <div className="LoginPage">
            <div className="Login">
                <h1>Hey! Welcome to Splitwise</h1>
                <form>
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" />
                    
                    <label htmlFor="email">Email id:</label>
                    <input type="text" id="email" name="email" />
                    
                    <button type="submit">Sign Up</button>
                </form>
                <a href="www.google.com">Already Registered?</a>
            </div>
        </div>
    );
}
