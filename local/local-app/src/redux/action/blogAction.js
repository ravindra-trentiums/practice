import { Api, Urls } from '../api';
import * as Type from '../types'
import { NotificationManager } from 'react-notifications'
import { API_URL } from "../../config"
import axios from 'axios';
import store from "../store";

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
export const editBlog = (body) => dispatch => {
    const {
        authentication
    } = store.getState();
    // findByIdAndUpdate(req.params.id, {
    //     title: req.body.title,
    //     body: req.body.body
    // }, { new: true });
    return axios.put(
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
            dispatch(getBlog())
            NotificationManager.success('Blog updated successfully.');
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
        if (response && response.status === 200) {
            dispatch({ type: Type.GET_BLOG_SUCCESS, payload: response.data })
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
export const deleteBlog = (id) => dispatch => {
    dispatch({ type: Type.REMOVE_BLOG_REQUEST })
    return Api.delete(Urls.blog,{data:id}).then(response => {
        if (response && response.status === 200) {
            dispatch({ type: Type.REMOVE_BLOG_SUCCESS, payload: response.data })
            return response
        } else {
            dispatch({ type: Type.REMOVE_BLOG_FAILED })
            NotificationManager.error(
                response?.data?.message ||
                'Something went wrong. Please try again',
            );
            return response
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: Type.GET_BLOG_FAILED })
        const { response } = error;
        NotificationManager.error(
            response?.data?.message ||
            'Something went wrong. Please try again',
        );
    })
}


