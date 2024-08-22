import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import { RootStoreContext } from "../../../store/RootStoreProvider";

import { handleAuthGoogle, handleAuthGitHub, checkAuth } from '../../../utils/fireBase/authFireBaseService';
import { getErrorMessageFireBasePopup } from '../../../utils/errors/errorsFirebase';

const AuthPopup = ({open, setOpen}) => {
    const [logOrReg, setLogOrReg] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const {userStore} = useContext(RootStoreContext);

    const handleRegisterUserWithEmailAndPass = async (email, password) => {
        try {
            await checkAuth(userStore);
            
            if (logOrReg) {
                await userStore.login(email, password);
            } else {
                await userStore.registration(email, password);
            }
            handleClose();
        } catch (error) {
            const errorMessage = getErrorMessageFireBasePopup(error);
            setErrorMessage(errorMessage);
        }
    };


    const handleLogRegWithGoogle = async () => {
        try {
            await checkAuth(userStore);
            const userFireBase = await handleAuthGoogle();

            if (userFireBase) {
                await userStore.getUserFromDB(userFireBase.email, userFireBase.token, userFireBase.userData);
                handleClose();
            } else {
                console.log('No user data from Firebase');
            }
        } catch (error) {
            const errorMessage = getErrorMessageFireBasePopup(error);
            setErrorMessage(errorMessage);
        }
    };
    const handleLogRegWithGitHub = async () => {
        try {
            await checkAuth(userStore);
            const userFireBase = await handleAuthGitHub();

            if (userFireBase) {
                await userStore.getUserFromDB(userFireBase.email, userFireBase.uid, userFireBase.userData);
                handleClose();
            } else {
                console.log('No user data from Firebase');
            }
        } catch (error) {
            const errorMessage = getErrorMessageFireBasePopup(error);
            setErrorMessage(errorMessage);
        }
    };

    const handleLogOrReg = () => {
        setLogOrReg(prevLogOrReg => !prevLogOrReg);
    };

    const handleClose = () => {
        setOpen(false);
        setErrorMessage(null);
    };
    
    return (
        <React.Fragment>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());

              const email = formJson.email;
              const password = formJson.password;
              //const phoneNumber = formJson.phoneNumber;

              handleRegisterUserWithEmailAndPass(email, password);

                //   handleClose();
            },
          }}
        >
            <Box>
                <DialogTitle>{logOrReg ? "Вхід" : "Реєстрація"}</DialogTitle>
            </Box>

            <Box sx={{display: "flex", flexDirection: "row"}}>
                <Box sx={{maxWidth: "350px"}}>
                    <DialogContent>
                        <DialogContentText>
                            {logOrReg ? "To have all the functionality, please log in to your account" : 
                                        "To have all the functionality, please register your account"}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        {/* PHONE NUMBER */}
                        {/* {logOrReg ? null
                        : <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone number"
                            type="number"
                            fullWidth
                            variant="standard"
                            /> 
                        } */}
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>

                    <DialogActions sx={{justifyContent: "center", width: "100%",display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                        {errorMessage && (
                            <Box sx={{color: "red"}}>
                                {errorMessage}
                            </Box>
                        )}      

                        {logOrReg ? (
                            <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                                <Button type="submit">Увійти</Button>
                                <Button onClick={handleLogOrReg}>Зареєструватися</Button>
                            </Box>
                        ) : (
                            <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                                <Button type="submit">Зареєструватися</Button>
                                <Button onClick={handleLogOrReg}>Увійти</Button>
                            </Box>
                        )}
                    </DialogActions>
                </Box>

                <Box sx={{width: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "right"}}>
                    <DialogContent sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <DialogContentText>
                            {logOrReg ? "Log in with" : 
                                        "Register with"}
                        </DialogContentText>

                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleLogRegWithGoogle}
                                >
                                <GoogleIcon />
                            </IconButton>
                        </Box>

                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleLogRegWithGitHub}
                                >
                                <GitHubIcon />
                            </IconButton>
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Box>

        </Dialog>
      </React.Fragment>
    );
};

export default AuthPopup;