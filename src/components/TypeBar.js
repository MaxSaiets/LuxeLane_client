import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreProvider";
import { observer } from "mobx-react-lite";

const TypeBar = observer(() => {  
    const {deviceStore} = useContext(RootStoreContext)
 
    return(
        <div>
            {deviceStore.types.map(type =>
                <div 
                    key={type.id} 
                    style={{border: '1px solid black', cursor: 'pointer',
                    backgroundColor: type.id === deviceStore.selectedType.id ? 'green' : 'inherit',
                    }}
                    onClick={() => deviceStore.setSelectedType(type)}
                    >
                    <h1 style={{padding: 10, fontSize: 18}}>{type.name}</h1>
                </div>
            )}
        </div>
    );
});

export default TypeBar;