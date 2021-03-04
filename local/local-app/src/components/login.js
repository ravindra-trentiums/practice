import React, { memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'


function Login() {
    const initialState = {
        fields: {},
        errors: {},
    }
    const [loginDetails, setLoginDetails] = useState(initialState)
    const [loading, setLoading] = useState(false)
    //   const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const handleValidation = () => {
        let fields = loginDetails.fields
        let errors = {}
        if (!fields['email'] || !fields['email'].trim()) {
            errors['email'] = 'Email cannot be empty.\n'
        }
        if (!fields['password'] || !fields['password'].trim()) {
            errors['password'] = 'Password cannot be empty.\n'
        }
        if (fields['password'] && fields['password'].length < 5) {
            errors['password'] = 'Password should be at least 5 digits.\n'
        }
        if (Object.keys(errors).length) {
            NotificationManager.error(Object.values(errors))
            setLoginDetails({ ...loginDetails, errors: errors })
            setLoading(false)
        }
        return Object.keys(errors).length > 0 ? false : true
    }

    const handleSubmit = async (e) => {
        if (loading) return
        try {
            setLoading(true)
            e.preventDefault()
            if (handleValidation()) {
                //     let res = await auth.createUserWithEmailAndPassword(
                //       registerDetails.fields.email,
                //       registerDetails.fields.password,
                //     )
                //     NotificationManager.success('Please check your inbox and verify your email address.')
                //     res.user.sendEmailVerification({ url: getContinueURL(location.search) })
                //     setLoading(false)
            }
        } catch (error) {
            NotificationManager.error(
                error?.message ||
                error?.response?.data?.messsage ||
                error.toString() ||
                'Server error. Please try again',
            )
            setLoading(false)
        }
    }


    const handleChange = (e, field) => {
        let fields = loginDetails.fields
        let errors = loginDetails.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setLoginDetails({ ...loginDetails, fields, errors })
    }
    return (
        <div className="page_container">
            <div className="box mb-5">
            <div className="col-md-12 mt-3 px-0"><h3>Login here...</h3></div>
                <form className="form-signin " onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-12 mt-3 px-0"> 
                            <input
                                type="email"
                                id="email"
                                className={`form-control${loginDetails?.errors?.email ? ' is-invalid' : ''}`}
                                placeholder="Email"
                                value={loginDetails?.fields?.email || ''}
                                onChange={(e) => handleChange(e, 'email')}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 ">
                        <div className="col-md-12 mt-3 px-0">
                            <input
                                type="password"
                                id="password"
                                className={`form-control${loginDetails?.errors?.password ? ' is-invalid' : ''}`}
                                placeholder="Password"
                                value={loginDetails?.fields?.password || ''}
                                onChange={(e) => handleChange(e, 'password')}
                            />
                        </div>
                    </div>
                    <div className="button mt-3" onClick={handleSubmit}>
                        {/* {loading && (
                            <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
                        )} */}
                        <div className="buttonText">Login</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
