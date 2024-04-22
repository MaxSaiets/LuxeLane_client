import React from "react";

import AdminRouter from "../components/Routers/AdminRouter";

import AdminSideBar from "../components/AdminContent/AdminSideBar/AdminSideBar";

import { Box } from "@mui/material";

const AdminPanel = () => {
    
    return (
        <div className="app">
            <main className="content">
                <Box sx={{display: "flex", flexDirection: "row", width: "100%"}}>

                    {/* <Box sx={{width: "250px"}}> */}
                    <Box>
                        <AdminSideBar />
                    </Box>

                    {/* <Box sx={{width: "calc(100% - 250px)"}}> */}
                    <Box sx={{padding: "0 20px"}}>
                        <AdminRouter />
                    </Box>                    
                </Box>
            </main>
        </div>
    );
};

export default AdminPanel;


// import React, { useState } from "react";
// import CreateDevice from "../components/modals/CreateDevice";
// import CreateBrand from "../components/modals/CreateBrand";
// import CreateType from "../components/modals/CreateType";

// const Admin = () => {
//     const [brandVisible, setBrandVisible] = useState(false);
//     const [typeVisible, setTypeVisible] = useState(false);
//     const [deviceVisible, setDeviceVisible] = useState(false);

//     return (
//         <div style={{padding: 50, display: "flex", flexDirection: 'column'}}>
//             <div>
//                 <button onClick={() => setDeviceVisible(true)}>Додати: Device</button>
//                 <button onClick={() => setTypeVisible(true)}>Додати: Type</button>
//                 <button onClick={() => setBrandVisible(true)}>Додати: Brand</button>
//             </div>


//             <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
//             <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
//             <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
//         </div>
//     );
// };

// export default Admin;