import axios from "axios";
import { getUserInfo } from "./localStorage";

export const signin = async ({email , password}) =>{
    try {
    const res = await axios({
        url : `http://localhost:5000/api/users/signin`,
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        data : {
            email,
            password
        }
    });
    if(res.statusText !== 'OK'){
        throw new Error(res.data.message)
    }
    return res.data

    } catch (error) {
        console.log(error);
        return {error : error.message}
    }
}


export const register = async ({name , email , password}) =>{
    try {
    const res = await axios({
        url : `http://localhost:5000/api/users/register`,
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        data : {
            name,
            email,
            password
        }
    });
    if(res.statusText !== 'OK'){
        throw new Error(res.data.message)
    }
    return res.data

    } catch (error) {
        console.log(error);
        return {error : error.message}
    }
}

export const update = async ({name , email , password}) =>{
    try {
    const {_id , token} = getUserInfo();
    const res = await axios({
        url : `http://localhost:5000/api/users/${_id}`,
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        data : {
            name,
            email,
            password
        }
    });
    if(res.statusText !== 'OK'){
        throw new Error(res.data.message)
    }
    return res.data

    } catch (error) {
        console.log(error);
        return {error : error.message}
    }
}