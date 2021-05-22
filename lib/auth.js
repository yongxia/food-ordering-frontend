
import axios from 'axios';
import Cookie from "js-cookie";


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
    axios
        .post(`${API_URL}/auth/local`, {
            identifier,
            password,
        })
        .then(response => {
            const { user, jwt } = response.data;
            Cookie.set("token", jwt);
            //do something
        })
        .catch(error => {
            return <h2>{`An error occurred ${error.response}`}</h2>;
        });
}


export const logout = () => {
    Cookie.remove(token);
    //
}