import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import './HomePage.css';
import logo from './logo.svg';

function Navbar() {
    return (
        <div className="Navbar">
            <NavLink exact to="/" activeClassName="active">Groups</NavLink>
            <NavLink to="/friends" activeClassName="active">Friends</NavLink>
            <NavLink to="/activity" activeClassName="active">Activity</NavLink>
            <NavLink to="/account" activeClassName="active">Account</NavLink>
        </div>
    );
}

function Template() {
    return (
        <div className="Template">
            <img src={logo} alt="TypeOfGroup" />
            <div>
                <h1>Title</h1>
                <p>Your Balance: </p>
            </div>
        </div>
    );
}

function Groups() {
    return (
        <div>
            <div className="GroupTitle">
                <h2>Total Balance: </h2>
                <button>+ New Group</button>
            </div>
            <div className="Groups">
                <Template /><Template /><Template /><Template />
            </div>
        </div>
    );
}

function Friends() {
    return (
        <div className="Friends">
            Friends Content
        </div>
    );
}

function Activity() {
    return (
        <div className="Activity">
            Activity Content
        </div>
    );
}

function Account() {
    return (
        <div className="Account">
            Account Content
        </div>
    );
}

export default function HomePage() {
    return (
        <Router>
            <div className="HomePage">
                <Navbar />
                <div className="Content">
                    <Routes>
                        <Route exact path="/" element={<Groups />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
