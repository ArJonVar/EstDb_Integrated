//import React from 'react';
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);
//import useDispatch from 'react-redux';
//import express from 'express';
//import config from './config.json'
//import * as config from './config.json';
//import querystring from 'querystring'
//import smartclient from 'smartsheet'
//import fs from 'fs';

const express = require('express'),
  config = require('./config.json'),
  qs = require('querystring'),
  smarclient = require('smartsheet'),
  app = express(),
  fs = require('fs');

// instantiating the Smartsheet client
const smartsheet = smarclient.createClient({
    // a blank token provides access to Smartsheet token endpoints
    accessToken: ''
});

// starting an express server
const port = '9002'
const hostname = '143.198.143.125'

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// setting up home route containing basic page content
//app.get('/Oauth', (req, res) => {
//    res.send('<h1>Welcome to Estimating Database Security hub</h1><a href="/auth">Login to Smartsheet</a>')
//});

// route redirecting to authorization page
app.get('/Oauth', (req, res) => {
    console.log('Your authorization url: ', authorizationUri);
    res.redirect(authorizationUri);
});

// helper function to assemble authorization url
function authorizeURL(params) {
    const authURL = 'https://app.smartsheet.com/b/authorize';
    return `${authURL}?${qs.stringify(params)}`;
}
const authorizationUri = authorizeURL({
    response_type: 'code',
    client_id: config.APP_CLIENT_ID,
    scope: config.ACCESS_SCOPE
});

// callback service parses the authorization code, requests access token, and saves it 
app.get('/callback', (req, res) => {
    console.log(req.query);
    const authCode = req.query.code;
    const generated_hash = require('crypto')
        .createHash('sha256')
        .update(config.APP_SECRET + "|" + authCode)
        .digest('hex');
    const options = {
        queryParameters: {
            client_id: config.APP_CLIENT_ID,
            code: authCode,
            hash: generated_hash
        }
    };
    smartsheet.tokens.getAccessToken(options, processToken)
        .then((token) => {
            return res
                .status(200)
                .json(token);
        });
});

// Sample for REFERENCE ONLY. A production app should not be structured this way. 
app.get('/refresh', (req, res) => {
    fs.access('token_priv.json', (err) => {
        // redirect to normal oauth flow if no existing token
        if (err && err.code === 'ENOENT') {
            console.log(err);
            res.redirect(authorizationUri);
        }
        console.log('...Refreshing Expired Token...')
        const old_token = require('./token_priv.json');
        // if current date is past expiration date...
        if (Date.now() > old_token.EXPIRES_IN) {
            const generated_hash = require('crypto')
                .createHash('sha256')
                .update(config.APP_SECRET + "|" + old_token.REFRESH_TOKEN)
                .digest('hex');
            const options = {
                queryParameters: {
                    client_id: config.APP_CLIENT_ID,
                    refresh_token: old_token.REFRESH_TOKEN,
                    hash: generated_hash
                }
            };
            smartsheet.tokens.refreshAccessToken(options, processToken)
                .then((token) => {
                    return res
                        .status(200)
                        .json(token);
                });
        } else {
            // token still valid. If attempting to force token refresh, change expires_in in priv_token.json
            console.log('token still valid')
            return res
                .send('<h1>No refresh. Access token still valid</h1>');
        }
    })
})


function processToken(error, token) {
    if (error) {
        console.error('Access Token Error:', error.message);
        return error;
    }
    console.log('The resulting token: ', token);

    var client = require('smartsheet');
    var smartsheet = client.createClient({accessToken:token.access_token});

    const user = smartsheet.users.getCurrentUser()
        .then(function(userProfile) {
            console.log(userProfile);
        })
        .catch(function(error) {
            console.log(error);
        });

    // IMPORTANT: token saved to local JSON as EXAMPLE ONLY. 
    // You should save access_token, refresh_token, and expires_in to database for use in application.
    let returned_token = {
        "ACCESS_TOKEN": token.access_token,
        "EXPIRES_IN": (Date.now() + (token.expires_in * 1000)),
        "REFRESH_TOKEN": token.refresh_token,
        "USER": user
    }
    fs.writeFileSync('token_priv.json', JSON.stringify(returned_token));

    return token;
}

