import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/action/commentAction'
import { NotificationManager } from 'react-notifications'
import { API_URL } from "../config"

function HomeData({ element }) {
    const dispatch = useDispatch()
    const initialState = {
        fields: {},
        errors: {},
    }
    const [commentDetails, setCommentDetails] = useState(initialState)
    const [totalComment, setTotalComment] = useState()
    const { token, userId } = useSelector((state) => ({
        token: state.authentication.token,
        userId: state.authentication.user,
        email: state.authentication.email,
    }))
    const handleValidation = () => {
        let fields = commentDetails.fields
        let errors = {}
       
        if (!fields['comment'] || !fields['comment'].trim()) {
            errors['comment'] = 'Comment cannot be empty.\n'
        }
        if (Object.keys(errors).length) {
            NotificationManager.error(Object.values(errors))
            setCommentDetails({ ...commentDetails, errors: errors })
            // setLoading(false)
        }
        return Object.keys(errors).length > 0 ? false : true
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (loading) return
        try {
            if (element && element._id) {
                commentDetails.fields["blogId"] = element._id
                // setLoading(true)
                if (handleValidation()) {
                    console.log(commentDetails, "object")
                    dispatch(actions.createComment(commentDetails.fields.blogId, userId, commentDetails.fields.comment))
                        .then(res => {
                            if (res && res.status === 200) {
                            } else {
                            }
                        }).catch(err => {
                        })
                }
            }
        } catch (error) {
            console.log(error)
            // setLoading(false)
        }
    }
    const handleChange = async (e, field) => {
        console.log(e.target.value)
        let fields = commentDetails.fields
        let errors = commentDetails.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setCommentDetails({ ...commentDetails, fields, errors })
    }
    useEffect(() => {
        dispatch(actions.getComments(element._id)).then(res => {
            if (res && res.status === 200) {
                console.log(res.data)
                setTotalComment(res.data)
                // history.push('/')
            } else {
                // history.push('/login')
            }
        }).catch(err => {
        })
    }, [])
    return (
        <div className="post_content">
            <div className="post_title">
                <h1>{element.tittle}</h1>
                <div className="post_info"> Posted by |  </div>
            </div>
            <div className="post_body"> <img src={`${API_URL}${element.blogImage}`} alt="" width="460px" height="380px" />
                {element.description}
            </div>
            {token && (
                <div className="leave_comment_section">
                    <div className="leave_comment_section_title">Comments | <a href="/comment" style={{fontSize:"12px"}}><span className="comment">{totalComment?.count} comments.</span></a></div>
                    <form onSubmit={handleSubmit}>
                        <div className="form_row" style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{}}>

                            </div>
                            <div>
                                <label>
                                    Your comment
                            </label>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                                <div style={{ flex: "0.8" }}>
                                    <textarea name="comment"
                                        id="comment"
                                        className={`form-control${commentDetails?.errors?.comment ? ' is-invalid' : ''}`}
                                        placeholder="Leave a Comment"
                                        value={commentDetails?.fields?.comment || ''}
                                        onChange={(e) => handleChange(e, 'comment')}>
                                    </textarea>
                                </div>
                                <div className="ml-5" style={{ flex: "0.2" }}>
                                    <button className="cmt-button">send</button>
                                </div>
                            </div>

                        </div>
                        {/* <div className="mt-3" onClick={handleSubmit}>
                            <button className="button">Click Me</button>
                        </div> */}
                    </form>
                </div>
            )}
        </div>
    )
}

export default HomeData
