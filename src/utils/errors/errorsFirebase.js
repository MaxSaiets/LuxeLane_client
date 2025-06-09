export const getErrorMessageFireBasePopup = (error) => {
    let errorMessage = "An error occurred while authorizing the user.";

    switch (error.code) {
        case "auth/email-already-in-use":
            errorMessage = "This email is already in use.";
            break;
        case "auth/wrong-password":
            errorMessage = "Incorrect email or password.";
            break;
        case "auth/invalid-email":
            errorMessage = "Invalid email.";
            break;
        case "auth/user-not-found":
            errorMessage = "Account not found.";
            break;
        case "auth/invalid-credential":
            errorMessage = "Incorrect email or password.";
            break;
        case "auth/account-exists-with-different-credential":
            errorMessage = "You already have an account with other authentication credentials. Please sign in with your existing login method.";
            break;
        default:
            errorMessage = error.message;
    }

    return errorMessage;
}