
import React, { useEffect, useState } from "react";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import config from './config.json';
import style from './SignIn.css'

const SignIn = ({handleSetAuthentication}) => {
    const googleResponse = async (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        console.log("response: ",response)
        localStorage.setItem('user', tokenBlob);
        handleSetAuthentication();
    };

    const onFailure = (error) => {
    console.log(error);
    };

    
  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
        localStorage.setItem('user', response);
        handleSetAuthentication();
    }
  }
    
  return (
    <div className={style.container}>
        <Card sx={{ minWidth: 250, maxWidth: 600, height: 250 }}>     
        <CardContent>
            Login with SocialMedia
        </CardContent>
        <CardActions>
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
        />
        </CardActions>
        <CardActions>
        <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
        />
        </CardActions>
        </Card>
    </div>
  );
}

export default SignIn;