import React from "react";

const LoginButton = () => {
    const handleLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
    }
    return (
        <div>
            <button onClick={() => handleLogin('Google')}>Sign in with Google</button>
            <button onClick={() => handleLogin('Facebook')}>Sign in with Facebook</button>
            <button onClick={() => handleLogin('Email')}>Sign in with Email</button>
        </div>
    );
};

export default LoginButton;
