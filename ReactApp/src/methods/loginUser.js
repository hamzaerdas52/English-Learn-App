import React, { Component } from 'react'
import axios from 'axios'
import UrlIndex from '../methods/url'

const LoginUser = (email, password) => {
    const url = UrlIndex + 'login'
    axios({
        method: 'POST',
        url: url,
        data: {
            'email': email,
            'password': password
        }
    })
        .then((res) => {
            console.log(res.data['Token']),
                alert('Login Successful')
            setTimeout(() => {
                this.props.navigation.navigate('Home')
            }, 2000)
        })
        .catch((error) => alert(error.response.data['Error Message']))
};

export default LoginUser;




