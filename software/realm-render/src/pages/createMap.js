import React from "react";
import { useLocation } from 'react-router-dom';


const CreateMap = () => {

    const location = useLocation();
    const { state } = location;

    return (
        <div className="CreateMap">
            <h1>Create Map Here with Received Data</h1>
            <div>{location.state.name}</div>
        </div>
      );
};
export default CreateMap;