import React, { useContext } from "react";
import { DeviceStoreContext } from "..";
import { observer } from "mobx-react-lite";

const BrandBar = observer(() => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   
    const device = useContext(DeviceStoreContext)
 
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {device.brands.map(brand =>
                <div 
                    key={brand.id} 
                    style={{border: '1px solid black', cursor: 'pointer', 
                    backgroundColor: brand.id === device.selectedBrand.id ? 'green' : 'inherit',
                    }}
                    onClick={() => device.setSelectedBrand(brand)}
                    >
                    <h1 style={{padding: 5, fontSize: 18}}>{brand.name}</h1>
                </div>
            )}
        </div>
    );
});

export default BrandBar;