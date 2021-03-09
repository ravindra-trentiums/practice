import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import * as actions from "../redux/action/action"
function Blog() {
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        fields: {},
        errors: {},
    }
    const [blogDetails, setBlogDetails] = useState(initialState)
    // const toBase64 = file =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //     });
    // const test = () => {
    //     console.log(
    //         "Test this.state.fileUploadOngoing=" + this.state.fileUploadOngoing
    //     );

    //     formData.append("test", "StringValueTest");

    //     const options = {
    //         method: "POST",
    //         body: formData
    //     };
    //     fetch("http://localhost:5000/ui/upload/file", options);
    // }
    
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
                            console.log(res)
                        if (res && res.status === 200) {
                            history.push('/')
                        } else {
                            history.push('/login')
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
        let fields = blogDetails.fields
        let errors = blogDetails.errors
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
        fields[field] = e.target.value
        errors[field] = undefined
        setBlogDetails({ ...blogDetails, fields, errors })
    }
    useEffect(()=>{
        dispatch(actions.getBlog()).then(res => {
                console.log(res)
            if (res && res.status === 200) {
                
            } else {

            }
        }).catch(err => {
        })
    })
    return (
        <div id="content_panel">
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
                    <div className="row ml-4 mt-2">
                        <div class="custom-file" style={{ width: "80%" }}>
                            <input type="file" class="custom-file-input" id="blogImage" onChange={(e) => handleChange(e, 'blogImage')} />
                            <label class="custom-file-label" for="blogImage">Choose file</label>
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

            </div>
        </div>
    )
}

export default Blog
