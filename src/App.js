import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage"
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile";



function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setContacts(contactsFormServer);
    };
    getContacts();
  }, []);


  // form submit function
  const formSub = async (data) => {
    const res = await fetch("http://localhost:3009/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newdata = await res.json();
    if (res.ok) {
      setContacts([...contacts, newdata]);
    }
  };
  // get all contact
  const fetchContacts = async () => {
    const res = await fetch("http://localhost:3009/contacts");
    const data = await res.json();
    setContacts(data);
    return data;
  };

  // delete contact
  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3009/contacts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      let newContact = contacts.filter((singleContact) => {
        return singleContact.id !== id;
      });

      setContacts(newContact);
    }
  };


  const editContact = async (id, updatedData) => {
    const res = await fetch(`http://localhost:3009/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (res.status === 200) {
      const updatedContact = await res.json();
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === updatedContact.id) {
          return updatedContact;
        }
        return contact;
      });
      setContacts(updatedContacts);
    }
  };

  // get single contact
  const getCon = async (id) => {
    const res = await fetch(`http://localhost:3009/contacts/${id}`);
    const data = await res.json();

    return data;
  };

  return (
    <Router>
      <>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home formSub={formSub} contacts={contacts} />} />
          <Route exact path="/users" element={<UserList contacts={contacts} deleteContact={deleteContact} editContact={editContact} />} />
          <Route path="/users/:id" element={<UserProfile editContact={editContact} />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
      </>

    </Router>

  );
}

export default App;

