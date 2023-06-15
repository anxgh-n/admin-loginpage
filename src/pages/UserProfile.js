import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Headers from '../components/Headers';

import { AiOutlineEdit } from 'react-icons/ai';
import './UserP.css';

function UserProfile({ contacts, editContact }) {
    const { id } = useParams(); // Access the URL parameter for the user ID
    const [contact, setContact] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedContact, setEditedContact] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3009/contacts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setContact(userData);
                setEditedContact(userData); // Initialize the edited user state with the fetched user data
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [id]);

    // Assume this function updates the contact on the server or data source
    const updateContact = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:3009/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update contact');
            }
            // Handle the success response as needed
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePicFile(file);
    };

    const handleSaveClick = () => {
        if (profilePicFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const profilePic = reader.result;
                setEditedContact((prevContact) => ({
                    ...prevContact,
                    profilePic,
                }));
                updateContact(editedContact.id, editedContact);
                setContact((prevContact) => ({
                    ...prevContact,
                    profilePic,
                }));
                setEditMode(false);
                navigate("/users"); // Exit edit mode
            };
            reader.readAsDataURL(profilePicFile);
        } else {
            updateContact(editedContact.id, editedContact);
            setContact(editedContact); // Update the user state with the edited user data
            setEditMode(false);
            // Exit edit mode
        }
    };

    if (!contact) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Headers />
            <div className="container content mt-4 ">
                <Link to="/users">
                    <button className="btn btn-cl">Go Home</button>
                </Link>
                <div className="row border p-4 bcgedit">
                    <div className="col-md-4 prof-cont">

                        <img
                            src={contact.profilePic}
                            alt="Profile Picture"
                            height={200}
                            width={160} />


                    </div>
                    <div className="">
                        {editMode ? (
                            <>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">   <input type="text" name="name" value={editedContact.name} onChange={handleInputChange} /> </li>
                                    <li className="list-group-item">  <input type="text" name="email" value={editedContact.email} onChange={handleInputChange} /> </li>
                                    <li className="list-group-item">   <input type="text" name="phoneNumber" value={editedContact.phoneNumber} onChange={handleInputChange} /></li>
                                    <li className="list-group-item">  <input type="text" name="gender" value={editedContact.gender} onChange={handleInputChange} /></li>
                                    <li className="list-group-item">  <input type="text" name="password" value={editedContact.password} onChange={handleInputChange} /></li>
                                    <li className="list-group-item">  <button onClick={handleSaveClick}>Save</button></li>

                                </ul>

                            </>
                        ) : (
                            <>
                                <p></p>
                                <p>Name: {contact.name}</p>
                                <p>Email: {contact.email}</p>
                                <p>Phone Number: {contact.countryCode + contact.phoneNumber}</p>
                                <p>Gender: {contact.gender}</p>
                                <p>Password: {contact.password}</p>
                                <button className='edit-button' onClick={() => setEditMode(true)}><AiOutlineEdit
                                    className="edit-icon "
                                    style={{ fontSize: '30px' }} /></button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
