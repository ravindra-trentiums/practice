import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/action/commentAction'
import { NotificationManager } from 'react-notifications'
import { API_URL } from "../config"
import userIcon from "../assests/icons/img_415067.png"
function HomeData({ element }) {
    const dispatch = useDispatch()
    const initialState = {
        fields: {},
        errors: {},
    }
    const [commentDetails, setCommentDetails] = useState(initialState)
    const [showComment, setShowComment] = useState(false)
    const [editComment, setEditComment] = useState({ show: false })
    const [totalComment, setTotalComment] = useState(null)
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
                commentDetails.fields["userId"] = userId

                // setLoading(true)
                if (handleValidation()) {
                    setShowComment(false)
                    dispatch(actions.createComment(commentDetails.fields.blogId, userId, commentDetails.fields.comment))
                        .then(res => {
                            if (res && res.status === 200) {
                                setShowComment(true)
                            } else {
                                setShowComment(true)
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
        let fields = commentDetails.fields
        let errors = commentDetails.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setCommentDetails({ ...commentDetails, fields, errors })
    }
    const handleEdit = async (id) => {
        await setEditComment({ show: true, id: id })
    }
    const handleDelete = async (id) => {
        await setShowComment(false)
        await dispatch(actions.deleteComments({ id: id }))
        NotificationManager.success('Comment deleted successfully.');
        await setShowComment(true)
    }
    useEffect(() => {
        dispatch(actions.getComments(element._id)).then(res => {
            if (res && res.status === 200) {
                res.data.data = res.data.data.reverse()
                setTotalComment(res.data)
            } else {
                // history.push('/login')
            }
        }).catch(err => {
        })
    }, [showComment])
    return (
        <div className="post_content">
            <div className="post_title">
                <h1>{element.tittle}</h1>
                <div className="post_info"> Posted by | <span className="comment" style={{ fontSize: "12px", color: "#ded153" }} >{totalComment?.count} comments.</span>  </div>
            </div>
            <div className="post_body"> <img src={`${API_URL}${element.blogImage}`} alt="" width="460px" height="380px" />
                {element.description}
            </div>
            {token && (
                <div className="leave_comment_section" id="style-16">
                    <div className="leave_comment_section_title">Comments </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3" style={{ display: "flex", width: "100%" }}>
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
                    </form>
                    <div className="blog-comment mt-4">
                        <ul className="comments">
                            {totalComment &&
                                totalComment.data &&
                                totalComment.data.map((commentInfo, i) => (
                                    <>
                                        {commentInfo.userId === userId ? (
                                            <li key={`key${i}`} style={{ paddingLeft: "180px" }}>
                                                <img src={userIcon} className="avatar" alt="" />
                                                {editComment && editComment?.id === commentInfo._id ? (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="post-comments-left" >
                                                            <textarea name="comment"
                                                                id="comment"
                                                                className={`form-control${commentDetails?.errors?.comment ? ' is-invalid' : ''}`}
                                                                placeholder=""
                                                                value={commentDetails?.fields?.comment || ''}
                                                                onChange={(e) => handleChange(e, 'comment')}>
                                                            </textarea>
                                                            {/* <div className="ml-5" style={{ flex: "0.2" }}> */}
                                                                <button className="edit-btn">save</button>
                                                            {/* </div> */}
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div className="post-comments-left" >
                                                        <p className="meta">{commentInfo.createdAt.split("T")[0]}  Your Comment :</p>
                                                        <p>{commentInfo.comment}</p>
                                                        <p >
                                                            <a href="#" onClick={() => { handleEdit(commentInfo._id) }}>edit</a>&nbsp;&nbsp;
                                                        <a href="#" onClick={() => { handleDelete(commentInfo._id) }}>delete</a>
                                                        </p>
                                                    </div>
                                                )}
                                            </li>
                                        ) : (<li key={`key${i}`} className="clearfix" style={{ width: "60%" }}>
                                            <img src={userIcon} className="avatar" alt="" />
                                            <div className="post-comments-left">
                                                <p className="meta">{commentInfo.createdAt.split("T")[0]} <a href="#">JohnDoe</a> says : <i className="pull-left"><a href="#"><small>Reply</small></a></i></p>
                                                <p>{commentInfo.comment}</p>
                                            </div>
                                        </li>)}
                                    </>
                                ))}
                        </ul>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default HomeData
