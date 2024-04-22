import { signInWithPopup, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// fetchSignInMethodsForEmail - отримання списку методів входу 

export const registerUserWithEmailAndPassFireBase = async (email, password) => {
    const auth = getAuth();
    
    try {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.length > 0) {
            const message = `Користувач з електронною адресою ${email} вже має обліковий запис. Будь ласка, увійдіть до свого акаунту.`;
            throw new Error(message);
        }  else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userFireBase = userCredential.user;

            const token = await userFireBase.getIdToken();

            return {
                userData: {
                    name: userFireBase.displayName,
                    photoURL: userFireBase.photoURL,
                },
                email: userFireBase.email,
                token: token,
            };
        }
    } catch (error) {
        throw error;
    }
};


export const loginUserWithEmailAndPassFireBase = async (email, password) => {
    const auth = getAuth();
    
    try {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.length > 0) {
            const message = `Користувач з електронною адресою ${email} вже має обліковий запис. Будь ласка, увійдіть до свого акаунту.`;
            throw new Error(message);
        }  else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userFireBase = userCredential.user;

            const token = await userFireBase.getIdToken();

            return {
                userData: {
                    name: userFireBase.displayName,
                    photoURL: userFireBase.photoURL,
                },
                email: userFireBase.email,
                token: token,
            };
        }
    } catch (error) {
        console.error('Error during login:', error.code);
        throw error;
    }
};

export const handleAuthGoogle = async () => {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        const userFireBase = result.user;
        const email = userFireBase.email;

        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods && methods.length > 0) {
            const message = "Ви вже зареєстровані з іншими обліковими даними. Будь ласка, увійдіть за допомогою вже існуючого методу входу або об'єднайте ваші облікові записи.";
            throw new Error(message);
        }

        const token = await userFireBase.getIdToken();

        return {
            userData: {
                name: userFireBase.displayName,
                photoURL: userFireBase.photoURL,
            },
            email: userFireBase.email,
            token: token,
        };
    } catch (error) {
        throw error;
    }
};

export const handleAuthGitHub = async () => {
    try {
        const auth = getAuth();
        const provider = new GithubAuthProvider();

        const result = await signInWithPopup(auth, provider);
        const userFireBase = result.user;
        const email = userFireBase.email;

        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods && methods.length > 0) {
            const message = "Ви вже зареєстровані з іншими обліковими даними. Будь ласка, увійдіть за допомогою вже існуючого методу входу або об'єднайте ваші облікові записи.";
            throw new Error(message);
        }
        const token = await userFireBase.getIdToken();

        return {
            userData: {
                name: userFireBase.displayName,
                photoURL: userFireBase.photoURL,
            },
            email: userFireBase.email,
            token: token,
        };
    } catch (error) {
        throw error;
    }
};


export const checkAuth = async (user) => {

    try {
        if(user.isAuth){
            const confirmMerge = window.confirm("Вийти зі свого обліковог обліку?");
            if (confirmMerge) {
                await user.logout();
            } else {
                // The user refused to log out.
                return;
            }
        }
    } catch (error) {
        throw error;
    }
};