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
    const [transactions, setTransactions] = useState([
        { id: 1, group: "Group 1", person: "Alice", amount: 50, date: "2024-07-01" },
        { id: 2, group: "Group 2", person: "Bob", amount: 30, date: "2024-06-28" },
        { id: 3, group: "Group 3", person: "Charlie", amount: 100, date: "2024-06-25" },
    ]);

    return (
        <div className="Activity">
            <h1>Past Transactions</h1>
            <div className="TransactionList">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="Transaction">
                        <div className="TransactionDetails">
                            <p><strong>Group:</strong> {transaction.group}</p>
                            <p><strong>Person:</strong> {transaction.person}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Account() {
    const [profile, setProfile] = useState({
        username: "JohnDoe123",
        email: "john.doe@example.com",
        contact: "+91-9999999999",
        profilePicture: person
    });
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfile(updatedProfile);
        setIsEditing(false);
    };

    const handlePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUpdatedProfile({ ...updatedProfile, profilePicture: event.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="Account">
            <h1>Profile</h1>
            {isEditing ? (
                <div className="ProfileForm">
                    <label>
                        Profile Picture:
                        <input type="file" onChange={handlePictureChange} />
                        <img src={updatedProfile.profilePicture} alt="Profile" className="ProfilePicture" />
                    </label>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={updatedProfile.username}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, username: e.target.value })}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={updatedProfile.email}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
                        />
                    </label>
                    <label>
                        Contact:
                        <input
                            type="tel"
                            value={updatedProfile.contact}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, contact: e.target.value })}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="ProfileDetails">
                    <img src={profile.profilePicture} alt="Profile" className="ProfilePicture" />
                    <p><strong>Username : </strong> {profile.username}</p>
                    <p><strong>Email : </strong> {profile.email}</p>
                    <p><strong>Contact : </strong> {profile.contact}</p>
                    <button onClick={handleEdit}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}


export default function HomePage() {
    const [templates, setTemplates] = useState([<Template key={0} />]);
    const [friendNames, setFriendNames] = useState(["Name"]);
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
