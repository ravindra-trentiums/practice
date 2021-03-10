import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import * as actions from "../redux/action/blogAction"
import editIcon from "../assests/icons/edit-icon.png"
import delIcon from "../assests/icons/Empty-icon.png"
import BlogModal from './blogModal'
import { API_URL } from "../config"

function Blog() {
    const dispatch = useDispatch()
    // const history = useHistory()
    const initialState = {
        fields: {},
        errors: {},
    }
    const { blog } = useSelector((state) => ({
        blog: state.authentication.blog,
    }))
    const [selectedBlog, setSelectedBlog] = useState({ showModal: false })
    const [refreshPage, setRefreshPage] = useState(false)
    const [isHome, setIsHome] = useState(false)
    const [blogDetails, setBlogDetails] = useState(initialState)

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
    const handleDelete = (id) => {
        dispatch(actions.deleteBlog({ id: id }))
        setRefreshPage(true)
    }
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

                body.append("file", fileInput.files[0]);
                dispatch(actions.addBlog(body
                )).then(res => {
                    if (res && res.status === 200) {
                        setRefreshPage(true)
                    } else {
                        setRefreshPage(true)
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
        console.log(e.target.value)
        let fields = blogDetails.fields
        let errors = blogDetails.errors
        if (field === "isHome") {
            isHome === true ? (setIsHome(false)) : (setIsHome(true))
            fields["isHome"] = !isHome
        } else {
            fields[field] = e.target.value
            errors[field] = undefined
        }
        setBlogDetails({ ...blogDetails, fields, errors })

        // if (field == "blogImage") {
        //     let file = await toBase64(e.target.files[0]);
        //     let fileData = {
        //         base_file: e.target.files[0],
        //         name: e.target.files[0].name,
        //         data: file.split(',')[1],
        //     };
        //     fields[field] = fileData
        // } else {
        //     fields[field] = e.target.value
        // }
    }
    useEffect(() => {
        setRefreshPage(false)
        dispatch(actions.getBlog())
    }, [refreshPage])
    return (
        <div id="content_panel">
            <BlogModal
                selectedBlog={selectedBlog}
                setSelectedBlog={setSelectedBlog}
            />
            <div className="blog_left" style={{ flex: "0.25", borderRight: "1px solid black" }}>
                <form className="form-signin " style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onSubmit={handleSubmit}>
                    <h4 className="mt-3">Add New Blog Here</h4>
                    <div className="row ">
                        <div className="col-md-12 ">
                            <input
                                type="tittle"
                                id="tittle"
                                className={`form-control${blogDetails?.errors?.tittle ? ' is-invalid' : ''}`}
                                placeholder="Tittle"
                                value={blogDetails?.fields?.tittle || ''}
                                onChange={(e) => handleChange(e, 'tittle')}
                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12 mt-3 ">
                            <textarea type="description"
                                id="description"
                                className={`form-control${blogDetails?.errors?.description ? ' is-invalid' : ''}`}
                                placeholder="Description"
                                value={blogDetails?.fields?.description || ''}
                                onChange={(e) => handleChange(e, 'description')}></textarea>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12 mt-3 ">
                            <input type="checkbox" id="isHome" name="vehicle1" onChange={(e) => handleChange(e, 'isHome')} />
                            <label for="isHome">isHome</label>
                        </div>
                    </div>
                    <div className="row ml-4 mt-2">
                        <div className="col-md-12 mt-1 ">
                            <div class="custom-file" style={{ width: "80%" }}>
                                <input type="file" class="custom-file-input" id="blogImage" onChange={(e) => handleChange(e, 'blogImage')} />
                                <label class="custom-file-label" for="blogImage">Choose file</label>
                            </div>
                        </div>
                    </div>
                    <div className="button mt-3 mb-3" style={{ width: "50%" }} onClick={handleSubmit}>
                        {/* {loading && (
                            <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
                        )} */}
                        <div className="buttonText">ADD</div>
                    </div>
                </form>

            </div>
            <div className="blog_right" style={{ flex: "0.75" }}>
                <table class="table ">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Tittle</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">isHome</th>
                        <th scope="col">Action</th>
                    </tr>
                    {console.log(blog)}
                    {blog && blog.length > 0 ?
                        blog.map((item, index) => {
                            return (<tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.tittle}</td>
                                <td>{item.description}</td>
                                <td><img src={`${API_URL}${item.blogImage}`} width="50rem"></img></td>
                                <td><input type="checkbox" checked={item.isHome} />
                                </td>
                                <td>
                                    <div style={{ display: "flex" }}>
                                        <p className="mr-2" onClick={() => { setSelectedBlog({ ...item, showModal: true }) }}><img src={editIcon} alt="image" style={{ width: "1.5rem" }} ></img></p>
                                        <p onClick={() => { handleDelete(item._id) }}><img src={delIcon} alt="image" style={{ width: "1.5rem" }} ></img></p>
                                    </div>
                                </td>
                            </tr>)
                        })
                        : ""}
                </table>
            </div>
        </div >
    )
}

export default Blog
