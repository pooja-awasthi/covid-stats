
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
    
  return (
    <div className={style.container}>
        {/* <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.facebookResponse}
        /> */}
        <Card sx={{ minWidth: 250 }}>     
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
        </Card>
    </div>
  );
}

export default SignIn;