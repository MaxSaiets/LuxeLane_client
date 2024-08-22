import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import DeviceItem from "./DeviceItem";
import { RootStoreContext } from "../store/RootStoreProvider";

const DeviceList = observer(() => {
    const {deviceStore} = useContext(RootStoreContext)

    return (
        <>
            {deviceStore.devices.map(device => 
                <DeviceItem key={device.id} device={device} />
            )}
        </>
        // <div style={{display: "flex", flexDirection: 'row', flexWrap: 'wrap'}}> 
        // </div>
    );
});

export default DeviceList;