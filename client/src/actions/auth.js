import * as api from '../api/index.js';
import decode from 'jwt-decode';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        dispatch({type:"AUTH", data})
        navigate("/");
    } catch(error){
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const {} = await api.signUp(formData)
        console.log("Account created")
        navigate("/signin")
    } catch(error){
        console.log(error)
    }
}

export const auth = async () => {
    try {
        // check if token is still valid (checks to make sure last login was within 6 hours)
        // check key/id for validity (checks to make sure user is valid)

        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 >= new Date().getTime()){
                return true;
            } else {
                localStorage.setItem('user', "");
                localStorage.setItem('token', "");
                window.location.reload(false);
            }
        }
        return false;

    } catch(error) {   
        //console.log(error);
        return false;
    }
}