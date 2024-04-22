    import React from "react";
    import MainContent from "../components/MainContent/MainContent";

    const Main = () => {
        // const {device} = useContext(Context) 

        // useEffect(() => {
        //     fetchTypes().then(data => device.setTypes(data))
        //     fetchBrands().then(data => device.setBrands(data))
        //     fetchDevices().then(data => device.setDevices(data.rows))
        // }, [])

        return (
            <MainContent />
        );
    };

    export default Main;