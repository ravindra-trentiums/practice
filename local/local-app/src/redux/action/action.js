import axios from 'axios'
import { Api, Urls } from '../api';
import * as Type from '../types'
import { NotificationManager } from 'react-notifications'

//Create new user
export const login = (email, password) => dispatch => {
    try {
        console.log(email, "jhg", password)
        dispatch({ type: Type.POST_LOGIN_REQUEST });
        return Api.post(Urls.login, { email, password }).then(response => {
            if (response && response.status === 200) {
                dispatch({ type: Type.POST_LOGIN_SUCCESS, payload: response });
                NotificationManager.success('login successfully.');
            } else {
                NotificationManager.error(
                    response?.data?.message ||
                    response?.data?.metadata?.message ||
                    response?.statusText ||
                    response?.response?.statusText ||
                    'Something went wrong. Please try again',
                );
            }
        }).catch(error => {
            console.log(error.response, "object")
            dispatch({ type: Type.POST_LOGIN_FAILED, payload: error.response });
            const { response } = error;
            NotificationManager.error(
                response?.data?.message ||
                response?.data?.metadata?.message ||
                response?.statusText ||
                response?.response?.statusText ||
                'Something went wrong. Please try again',
            );
        })
    } catch (e) {
        console.log(e)
    }
    //
}

export const register = (name, email, gender, password) => dispatch => {
    console.log(axios.post(Urls.register), "object1")
    dispatch({type:Type.POST_REGISTER_REQUEST});
        return Api.post(Urls.register, {name, email, gender, password }).then(response => {
        if (response && response.status === 200) {
            dispatch({ type: Type.POST_REGISTER_SUCCESS, payload: response });
            NotificationManager.success('login successfully.');
        } else {
            NotificationManager.error(
                response?.data?.message ||
                response?.data?.metadata?.message ||
                response?.statusText ||
                response?.response?.statusText ||
                'Something went wrong. Please try again',
            );
        }
    }).catch(error => {
        console.log(error.response, "object")
        dispatch({ type: Type.POST_REGISTER_FAILED, payload: error.response });
        const { response } = error;
        NotificationManager.error(
            response?.data?.message ||
            response?.data?.metadata?.message ||
            response?.statusText ||
            response?.response?.statusText ||
            'Something went wrong. Please try again',
        );
    })
}

