import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";

const DevicePage = () => {
    const [device, setDevise] = useState({info: []});
    const { id } = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevise(data))
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "row", gap: 15}}>
            <div style={{width: '50%', padding: 10, textAlign: 'center'}}> 
                <img src={process.env.REACT_APP_API_URL + device.img}  alt={`img of device ${device.id}`}/>

                <div style={{marginTop: 30,display: 'flex', flexDirection: 'column', textAlign: "left"}}>
                    {device.info.map((info, index) => 
                        <div key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent' ,display: "flex", flexDirection: 'row', gap: 10, alignItems: "center"}}>
                            <p style={{fontSize: 18}}>{info.title}</p>
                            <p style={{fontSize: 14}}>{info.description}</p>
                        </div>
                    )}
                </div>
            </div>  
            <div style={{position: 'relative'}}>
                <h1>{device.name}</h1>
                <p>Price: {device.price}</p>
                <p>Rating: {device.rating}</p>

                <button>Добавити в корзину</button>


                <div style={{display: 'flex', flexDirection: 'column', gap: 15, position: 'fixed', top: '0', right: '0', width: 50, height: '100vh', border: '1px solid green', padding: 5}}>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                    <div style={{width: '70%', height: '30px', background: 'grey'}}></div>
                </div>
            </div>
        </div>
    );
};

export default DevicePage;