import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { useLocation } from "react-router-dom"; // дозволяє отримати маршрут в запросе
// import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../store/RootStoreProvider";

const Auth = observer(() => {
    const {userStore} = useContext(RootStoreContext);
    
    const location = useLocation() // дозволяє отримати маршрут в запросе
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const authClick = async () => {
        // try{
        //     let data;
        //     if(isLogin){
        //         data = await login(email, password)
        //     } else{
        //         data = await registration(email, password)
        //     }
        //     user.setUser(user)
        //     user.setIsAuth(true)
        //     navigate(MAIN_ROUTE)
        // }catch(err){
        //     alert(err.response.data.message)
        // }
    }

    return (
        <div style={{width: 500, height: 250, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'grey', color: 'white'}}>
            <div style={{margin: 50, textAlign: "center"}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <input value={email} onChange={elem => setEmail(elem.target.value)} placeholder="email" style={{textAlign: 'center', fontSize: 20}} />
                    <input value={password} onChange={elem => setPassword(elem.target.value)} type="password" placeholder="password" style={{textAlign: 'center', fontSize: 20}} />

                    <div style={{display: "flex", gap: 15, justifyContent: 'right'}}>
                        {isLogin ? (
                            <>
                                <a href={REGISTRATION_ROUTE} style={{width: 'auto', border: '1px solid', padding: 5, zIndex: 100, textDecoration: "none", color: 'inherit'}}>Не маєте аккаунт?</a>
                                <button onClick={authClick} style={{width: 'auto'}}>Увійти</button>
                            </>
                            ) : (
                            <>
                                <a href={LOGIN_ROUTE} style={{width: 'auto', border: '1px solid', padding: 5, zIndex: 100, textDecoration: "none", color: 'inherit'}}>Уже маєте аккаунт?</a>
                                <button onClick={authClick} style={{width: 'auto'}}>Зареєструватися</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;