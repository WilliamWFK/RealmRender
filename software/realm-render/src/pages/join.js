import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD2BiKIfddYlKeHJGDhGak0GISeyLBGgUE",
//     authDomain: "realm-render.firebaseapp.com",
//     databaseURL: "https://realm-render-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "realm-render",
//     storageBucket: "realm-render.appspot.com",
//     messagingSenderId: "685134175570",
//     appId: "1:685134175570:web:114415e40a45fa81522e8b",
//     measurementId: "G-1BF179DG8W"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

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
