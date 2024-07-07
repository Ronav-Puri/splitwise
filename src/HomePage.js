import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import './HomePage.css';
import logo from './logo.svg';
import person from './person.png'

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

function Groups({ templates, setTemplates }) {
    const handleClick = () => {
        setTemplates([...templates, <Template key={templates.length} />]);
    };

    return (
        <div>
            <div className="GroupTitle">
                <h2>Total Balance: </h2>
                <button onClick={handleClick}>+ New Group</button>
            </div>
            <div className="Groups">
                {templates}
            </div>
        </div>
    );
}

function FriendBox({ name }) {
    return (
        <div className="FriendBoxes">
            <h1>{name}</h1>
            <img src={person} alt={`${name}`} />
            <h1>Balance : </h1>
        </div>
    );
}

function Friends({friendNames,setFriendNames}) {
    const [newFriendName, setNewFriendName] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleAddFriend = () => {
        if (newFriendName.trim()) {
            setFriendNames([...friendNames, newFriendName]);
            setNewFriendName("");
            setIsAdding(false);
        }
    };

    return (
        <div className="Friends">
            <nav>
                <h1>Your Friends:</h1>
                <div className="FriendList">
                    {friendNames.map((name, index) => (
                        <FriendBox key={index} name={name} />
                    ))}
                </div>
                <div className="AddFriendContainer">
                    {!isAdding ? (
                        <button className="AddFriendButton" onClick={() => setIsAdding(true)}>+ Add Friend</button>
                    ) : (
                        <div className="AddFriendForm">
                            <input
                                type="text"
                                value={newFriendName}
                                onChange={(e) => setNewFriendName(e.target.value)}
                                placeholder="Enter friend's name"
                            />
                            <button onClick={handleAddFriend}>Submit</button>
                        </div>
                    )}
                </div>
            </nav>
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
    const [templates, setTemplates] = useState([<Template key={0} />]);
    const [friendNames, setFriendNames] = useState([]);
    return (
        <Router>
            <div className="HomePage">
                <Navbar />
                <div className="Content">
                    <Routes>
                        <Route exact path="/" element={<Groups templates={templates} setTemplates={setTemplates} />} />
                        <Route path="/friends" element={<Friends friendNames={friendNames} setFriendNames={setFriendNames}/>} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
