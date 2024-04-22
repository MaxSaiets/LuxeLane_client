import React from "react";
import { useNavigate } from "react-router-dom";

import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();

    return (
        <div style={{ height: 'auto', width: '300px', padding: 5, display: "flex",
            flexDirection: 'column', gap: 10, border: '1px solid green',
            cursor: 'pointer'             
            }} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <img src={process.env.REACT_APP_API_URL + device.img} alt={`Device id: ${device.id}`}/>
            <h2>{device.name}</h2>
            <p>{device.price}</p>
        </div>
    );
};

export default DeviceItem;