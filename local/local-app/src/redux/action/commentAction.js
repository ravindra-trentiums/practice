import { Api, Urls } from '../api';
import * as Type from '../types'
import { NotificationManager } from 'react-notifications'


export const createComment = (blogId, email, comment) => dispatch => {
    try {
        dispatch({ type: Type.COMMENT_REQUEST });
        return Api.post(Urls.comment, { blogId, email, comment }).then(response => {
            if (response && response.status === 200) {
                dispatch({ type: Type.COMMENT_SUCCESS, payload: response });
                NotificationManager.success('Comment successfully.');
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
            dispatch({ type: Type.COMMENT_FAILED, payload: error.response });
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

export const getComments = (id) => dispatch => {
    console.log("heree")
    dispatch({ type: Type.COMMENT_REQUEST })
    return Api.get(`${Urls.comment}/${id}`).then(response => {
        if (response && response.status === 200) {
            dispatch({ type: Type.COMMENT_SUCCESS, payload: response.data })
            return response
        } else {
            dispatch({ type: Type.COMMENT_FAILED })
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
