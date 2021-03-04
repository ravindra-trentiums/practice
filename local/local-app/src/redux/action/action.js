import axios from 'axios'
import { Api, Urls } from '../api';
import * as Type from '../types'

//Create new user
export const login = (email, password) => dispatch => {
    dispatch(Type.POST_LOGIN_REQUEST);
    return Api.post(Urls.login, { email, password }).then(res => {
        dispatch(Type.POST_LOGIN_SUCCESS,res);
    }).catch(err => {
        dispatch(Type.POST_LOGIN_FAILED,err);
    })
}

export const register = (email, fullname, username, password) => dispatch => {
    dispatch(Type.POST_REGISTER_REQUEST);
    return  axios.post(Urls.register, { email, fullname, username, password }).then(res => {
        dispatch(Type.POST_REGISTER_SUCCESS, res);
    }).catch(err => {
        dispatch(Type.POST_REGISTER_FAILED, err);
    })
}

