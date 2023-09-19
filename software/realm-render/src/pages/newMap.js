import React from "react";
import '../styles/NewMap.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";


const NewMap = () => {

    const [formData, setFormData] = useState({name: "",email: "",message: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
        );

        navigate("/createMap", {state: {name: formData.name, email: formData.email, message: formData.message}});
    }

    return (
      <div className="NewMap">
        <div className="NewMapForm">
          <h1>New Map</h1>
          <Link to="/index"><p>Home</p></Link>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}/>

                <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    );
  };

export default NewMap;