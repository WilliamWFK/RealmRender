import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RTDbObject from '../Model/RTDbObject';

// create new RTDbObject

const rtdb = new RTDbObject("ABCD");

rtdb.createMapListener(console.log)



const Join = () => {
    return (

        <div class="App">
            <h1>Feature not implemented yet</h1>
            <h2>William is working on this now!</h2>
            <Link to="/index" class="backButton">Back</Link>
        </div>
    )
}

export default Join;
