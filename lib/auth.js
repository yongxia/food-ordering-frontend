
import axios from 'axios';
import Cookie from "js-cookie";
import Router from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const register = ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/auth/local/register`, {
                username,
                email,
                password,
            })
            .then(response => {
                const { user, jwt } = response.data;
                Cookie.set("token", jwt);
                resolve(user.username);
            })
            .catch(error => reject(error.response));
    });
}

export const login = ({ identifier, password }) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/auth/local`, {
                identifier,
                password,
            })
            .then(response => {
                console.log(response.data);
                const { user, jwt } = response.data;
                Cookie.set("token", jwt);
                resolve(user.username);
            })
            .catch(error => reject(error.response));
    });

}


export const logout = () => {
    Cookie.remove("token");
    Router.push("/");
}