import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceApi";

const Shop = observer(() => {
    const device = useContext(Context) 

    // загрузка устройств з сервера
    useEffect(() => {
        // в deviceStore поміщаєм те що прийшло з сервера
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        //rows томущо ми робили пагінацію тобто розбивали на сторінки
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            <div style={{width: '10%', height: '100%', padding: 5, border: '2px solid green'}}>
                <TypeBar />
            </div>

            <div style={{ paddingLeft: 20, flex: 1}}>
                <div>
                    <BrandBar/>
                </div>

                <div style={{display: "flex", flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 20}}>
                    <DeviceList />
                </div>
            </div>
        </div>
    );
});

export default Shop;