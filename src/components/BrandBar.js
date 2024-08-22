import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreProvider";
import { observer } from "mobx-react-lite";

const BrandBar = observer(() => {
    const {deviceStore} = useContext(RootStoreContext)
 
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {deviceStore.brands.map(brand =>
                <div 
                    key={brand.id} 
                    style={{border: '1px solid black', cursor: 'pointer', 
                    backgroundColor: brand.id === deviceStore.selectedBrand.id ? 'green' : 'inherit',
                    }}
                    onClick={() => deviceStore.setSelectedBrand(brand)}
                    >
                    <h1 style={{padding: 5, fontSize: 18}}>{brand.name}</h1>
                </div>
            )}
        </div>
    );
});

export default BrandBar;