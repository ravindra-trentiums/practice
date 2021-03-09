import { Api, Urls } from '../api';
import * as Type from '../types'
import { NotificationManager } from 'react-notifications'
import { API_URL } from "../../config"
import axios from 'axios';
import store from "../store";

export const login = (email, password) => dispatch => {
    try {
        dispatch({ type: Type.POST_LOGIN_REQUEST });
        return Api.post(Urls.login, { email, password }).then(response => {
            if (response && response.status === 200) {
                dispatch({ type: Type.POST_LOGIN_SUCCESS, payload: response });
                NotificationManager.success('login successfully.');
                return response
            } else {
                NotificationManager.error(
                    response?.data?.message ||
                    response?.data?.metadata?.message ||
                    response?.statusText ||
                    response?.response?.statusText ||
                    'Something went wrong. Please try again',
                );
                return response
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
            return error
        })
    } catch (e) {
        console.log(e)
    }
    //
}
export const register = (name, email, gender, password) => dispatch => {
    return Api.post(Urls.register, { name, email, gender, password }).then(response => {
        if (response && response.status === 200) {
            NotificationManager.success('register successfully.');
        } else {
            NotificationManager.error(
                response?.data?.message ||
                'Something went wrong. Please try again',
            );
        }
    }).catch(error => {
        const { response } = error;
        NotificationManager.error(
            response?.data?.message ||
            'Something went wrong. Please try again',
        );
    })
}
export const addBlog = (body) => dispatch => {
    const {
        authentication
    } = store.getState();
    return axios.post(
        `${API_URL}/app/blog`,
        body,
        {
            headers: {
                "Authorization": authentication.token,
                "Content-type": "multipart/form-data",
            },
        }
    ).then(response => {
        if (response && response.status === 200) {
            NotificationManager.success('Blog created successfully.');
            return response
        } else {
            NotificationManager.error(
                response?.data?.message ||
                'Something went wrong. Please try again',
            );
            return response
        }
    }).catch(error => {
        const { response } = error;
        NotificationManager.error(
            response?.data?.message ||
            'Something went wrong. Please try again',
        );
    })
}
export const getBlog = () => dispatch => {
    dispatch({ type: Type.GET_BLOG_REQUEST })
    return Api.get(Urls.blog).then(response => {
        console.log(response)
        if (response && response.status === 200) {
            dispatch({ type: Type.GET_BLOG_SUCCESS, payload: response })
            console.log(response)
            return response
        } else {
            dispatch({ type: Type.GET_BLOG_FAILED })
            NotificationManager.error(
                response?.data?.message ||
                'Something went wrong. Please try again',
            );
            return response
        }
    }).catch(error => {
        dispatch({ type: Type.GET_BLOG_FAILED })
        const { response } = error;
        NotificationManager.error(
            response?.data?.message ||
            'Something went wrong. Please try again',
        );
    })
}
export const logout = () => dispatch => {
    dispatch({ type: Type.USER_LOGOUT, });
}

