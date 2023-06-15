import React, { useState, useEffect } from "react";
import Headers from "../components/Headers";
import "./UserL.css";
import { FaTrash } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";



function UserList({ editContact, contacts, deleteContact }) {
    const [editMode, setEditMode] = useState(false);
    const [editedContact, setEditedContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem("contacts"));
        if (storedContacts) {
            setEditedContact(storedContacts);
        }
    }, []);

    const handleEditClick = (contact) => {
        setEditMode(true);
        setEditedContact(contact);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePic" && files && files.length > 0) {
            setEditedContact((prevContact) => ({
                ...prevContact,
                profilePic: URL.createObjectURL(files[0]),
            }));
        } else {
            setEditedContact((prevContact) => ({
                ...prevContact,
                [name]: value,
            }));
        }
    };

    const handleSaveClick = () => {
        editContact(editedContact.id, editedContact);
        setEditMode(false);
        setEditedContact(null);
        navigate("/users"); // Navigate back to the UserList component
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSaveClick();
        }
    };

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    return (
        <>
            <Headers />
            <div className="container my-4">
                <div className="table-responsive btn-bg" >
                    <Link to="/home">
                        <button className="btn btn-clr">ADD USER</button>
                    </Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="beige-bg">Profile Picture</th>
                                <th className="beige-bg">Name</th>
                                <th className="beige-bg">Email</th>
                                <th className="beige-bg">Phone Number</th>
                                <th className="beige-bg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>

                                    <td>
                                        {editMode && editedContact?.id === contact.id ? (
                                            <input
                                                type="file"
                                                name="profilePic"
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <>

                                                <img
                                                    src={contact.profilePic}
                                                    alt="profile_pic"
                                                    className="img-thumbnail"
                                                    height={100}
                                                    width={100}
                                                    style={{ opacity: 1.0 }}
                                                />
                                                <p>ID:{contact.id}</p>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {editMode && editedContact?.id === contact.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedContact.name}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                            />
                                        ) : (
                                            <Link className="userlink" to={`/users/${contact.id}`}>{contact.name}</Link>
                                        )}
                                    </td>
                                    <td>
                                        {editMode && editedContact?.id === contact.id ? (
                                            <input
                                                type="text"
                                                name="email"
                                                value={editedContact.email}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                            />
                                        ) : (
                                            contact.email
                                        )}
                                    </td>
                                    <td>
                                        {editMode && editedContact?.id === contact.id ? (
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={editedContact.phoneNumber}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                            />
                                        ) : (
                                            contact.countryCode + contact.phoneNumber
                                        )}
                                    </td>
                                    <td>
                                        {editMode && editedContact?.id === contact.id ? (
                                            <button onClick={handleSaveClick}>Save</button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEditClick(contact)}
                                                    className="edit-button"
                                                >
                                                    <AiOutlineEdit className="edit-icon" style={{ fontSize: '28px' }} />
                                                </button>

                                                <button
                                                    onClick={() => deleteContact(contact.id)}
                                                    className="delete-button"
                                                >
                                                    <FaTrash className="edit-icon" style={{ fontSize: '24px' }} />
                                                </button>

                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {contacts.filter((single) => !single.fav).length === 0 && (
                                <tr>
                                    <td colSpan="5">
                                        <h1>No User Details</h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserList;
