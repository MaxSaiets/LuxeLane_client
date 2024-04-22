import React, { useContext } from "react";
import { DeviceStoreContext } from "..";

import { observer } from "mobx-react-lite";

const TypeBar = observer(() => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   
    const device = useContext(DeviceStoreContext)
 
    return(
        <div>
            {device.types.map(type =>
                <div 
                    key={type.id} 
                    style={{border: '1px solid black', cursor: 'pointer',
                    backgroundColor: type.id === device.selectedType.id ? 'green' : 'inherit',
                    }}
                    onClick={() => device.setSelectedType(type)}
                    >
                    <h1 style={{padding: 10, fontSize: 18}}>{type.name}</h1>
                </div>
            )}
        </div>
    );
});

export default TypeBar;