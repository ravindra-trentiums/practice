import React, {useState, useEffect, memo} from 'react';
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as actions from "../redux/action/blogAction"
import { NotificationManager } from 'react-notifications'
// import images from '../../../local-backend/public/image/blog'

function BlogModal({ selectedBlog, setSelectedBlog }) {
    const dispatch = useDispatch()
    const [isHome, setIsHome] = useState(false)
    //     const initialState = {
    //         id: selectedBlog?._id,
    //         tittle: selectedBlog?.tittle,
    //         description: selectedBlog?.description,
    //         blogImage: selectedBlog?.blogImage,
    //         isHome: selectedBlog?.isHome,
    // }
    const [blogDetails, setBlogDetails] = useState([])
    const handleValidation = () => {
        let fields = blogDetails.fields
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
        e.preventDefault()
        // if (loading) return
        try {
            // setLoading(true)
            if (handleValidation()) {
                const fileInput = document.querySelector("#blogImage");
                const body = new FormData();
                Object.keys(blogDetails.fields).forEach(k => {
                    body.append(k, blogDetails.fields[k]);
                });
                body.append("id", selectedBlog._id)
                body.append("file", fileInput.files[0]);
                dispatch(actions.editBlog(body
                )).then(res => {
                    if (res && res.status === 200) {
                        // setRefreshPage(true)
                    } else {
                        // setRefreshPage(true)
                    }
                }).catch(err => {
                })
            }
        } catch (error) {
            console.log(error)
            // setLoading(false)
        }
    }
    const handleChange = async (e, field) => {
        let fields = blogDetails
        console.log(blogDetails, "dd", e.target.value)
        if (field === "isHome") {
            isHome === true ? (setIsHome(false)) : (setIsHome(true))
            fields["isHome"] = !isHome
        } else {
            fields[field] = e.target.value
        }
        setBlogDetails({ ...blogDetails, fields })
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
                                        <input type="file" class="custom-file-input" id="blogImage" onChange={(e) => { }} />
                                        <label class="custom-file-label" for="blogImage">{blogDetails?.blogImage?.split("/")[3]}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedBlog({ ...selectedBlog, showModal: false })}>
                        Close
                    </Button>
                    <Button
                        style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
                        onClick={() => setSelectedBlog({ ...selectedBlog, showModal: false })}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default memo(BlogModal)
