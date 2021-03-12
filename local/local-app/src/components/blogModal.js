import React, { useState, useEffect, memo } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as actions from "../redux/action/blogAction"
import { NotificationManager } from 'react-notifications'
// import images from '../../../local-backend/public/image/blog'

function BlogModal({ selectedBlog, setSelectedBlog }) {
    const dispatch = useDispatch()
    const [isHome, setIsHome] = useState(false)
   
    const [blogDetails, setBlogDetails] = useState()
    const handleValidation = () => {
        let fields = blogDetails
        let errors = {}
        if (!fields['tittle'] || !fields['tittle'].trim()) {
            errors['tittle'] = 'Tittle cannot be empty.\n'
        }
        if (!fields['description'] || !fields['description'].trim()) {
            errors['description'] = 'Description cannot be empty.\n'
        }
        if (Object.keys(errors).length) {
            NotificationManager.error(Object.values(errors))
            setBlogDetails({ ...blogDetails, errors: errors })
            // setLoading(false)
        }
        return Object.keys(errors).length > 0 ? false : true
    }
    useEffect(() => {
        if (selectedBlog) {
            setBlogDetails(selectedBlog)
        }
    }, [selectedBlog])

    const handleSubmit = (e) => {
        console.log(e, "object")
        e.preventDefault()
        // if (loading) return
        try {
            // setLoading(true)
            if (handleValidation()) {
                const body = new FormData();
                Object.keys(blogDetails).forEach(k => {
                    body.append(k, blogDetails[k]);
                });
                body.append("id", selectedBlog._id)
                dispatch(actions.editBlog(body
                )).then(res => {
                    if (res && res.status === 200) {
                        setSelectedBlog({ ...selectedBlog, showModal: false })
                    } else {
                        setSelectedBlog({ ...selectedBlog, showModal: false })
                    }
                })
            }
        } catch (error) {
            console.log(error)
            // setLoading(false)
        }
    }
    const handleChange = async (e, field) => {
        console.log(field, "testibd", e.target.files)
        if (field === "isHome") {
            isHome === true ? (setIsHome(false)) : (setIsHome(true))
            console.log(blogDetails)
            blogDetails[field] = !isHome
        } else {
            if (field == "blogImage") {
                blogDetails["file"] = e.target.files[0]
                blogDetails[field] = e.target.value
            } else {
                blogDetails[field] = e.target.value
            } 
        }
        setBlogDetails({ ...blogDetails, blogDetails })
    }

    return (
        <div>
            <Modal show={selectedBlog.showModal} onHide={() => setSelectedBlog({ ...selectedBlog, showModal: false })}>
                <Modal.Header closeButton >
                    <Modal.Title><h3>Edit Blog</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-signin " onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <label>Tittle</label>
                                <input
                                    id="tittle"
                                    className={`form-control${
                                        // registerDetails?.errors?.firstName ? ' is-invalid' : ''
                                        ''
                                        }`}
                                    value={blogDetails?.tittle || ''}
                                    placeholder="tittle"
                                    onChange={(e) => { handleChange(e, 'tittle') }}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <label>Description</label>
                                <input
                                    id="description"
                                    className={`form-control${
                                        // registerDetails?.errors?.firstName ? ' is-invalid' : ''
                                        ''
                                        }`}
                                    value={blogDetails?.description || ''}
                                    placeholder="description"
                                    onChange={(e) => { handleChange(e, 'description') }}
                                />
                            </div>
                            <div className="col-md-12 mt-3 ">
                                <input type="checkbox" id="isHome" checked={blogDetails?.isHome} name="isHome" onChange={(e) => handleChange(e, 'isHome')} />
                                <label for="isHome">isHome</label>
                            </div>
                            <div className="col-md-12 mt-3" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="row ml-4 mt-2">
                                    <div class="custom-file" style={{ width: "80%" }}>
                                        <input type="file" class="custom-file-input" id="blogImage" onChange={(e) => handleChange(e, 'blogImage')} />
                                        <label class="custom-file-label" for="blogImage">Choose file</label>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12 mt-3 ">
                                <Button variant="secondary" onClick={() => setSelectedBlog({ ...selectedBlog, showModal: false })}>
                                    Close
                            </Button>
                                <Button
                                    style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
                                    // onClick={() => setSelectedBlog({ ...selectedBlog, showModal: false })}
                                    onClick={handleSubmit}>
                                    Create
                            </Button>
                            </div> */}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedBlog({ ...selectedBlog, showModal: false })}>
                        Close
                    </Button>
                    <Button
                        style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
                        onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default memo(BlogModal)
