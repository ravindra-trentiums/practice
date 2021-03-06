import React, { memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'

function Register() {
    const initialState = {
        fields: {},
        errors: {},
    }
    const [registerDetails, setRegisterDetails] = useState(initialState)
    const [loading, setLoading] = useState(false)
    //   const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const handleValidation = () => {
        let fields = registerDetails.fields
        let errors = {}
        if (!fields['email'] || !fields['email'].trim()) {
            errors['email'] = 'Email cannot be empty.\n'
        }
        if (fields['email'] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields['email'])) {
            errors['email'] = 'Email is invalid'
        }
        if (!fields['password'] || !fields['password'].trim()) {
            errors['password'] = 'Password cannot be empty.\n'
        }
        if (fields['password'] && fields['password'].length < 5) {
            errors['password'] = 'Password should be at least 5 digits.\n'
        }
        if (!fields['confirmPass'] || !fields['confirmPass'].trim()) {
            errors['confirmPass'] = 'Confirm password cannot be empty.\n'
        }
        if (fields['confirmPass'] && fields['confirmPass'].length < 6) {
            errors['confirmPass'] = 'Confirm password should be at least 6 digits.\n'
        }
        if (fields['password'] !== fields['confirmPass']) {
            console.log(fields['password'],fields['confirmPass'])
            errors['password'] = ` `
            errors['confirmPass'] = `Password and confirm password doesn't matched.\n`
        }
        if (Object.keys(errors).length) {
        NotificationManager.error(Object.values(errors))
        console.log(Object.values(errors))
        setRegisterDetails({ ...registerDetails, errors: errors })
            setLoading(false)
        }
        return Object.keys(errors).length > 0 ? false : true
    }

    const handleSubmit = async (e) => {
        console.log(e)
        if (loading) return
        try {
            setLoading(true)
            e.preventDefault()
            if (handleValidation()) {
                //     let res = await auth.createUserWithEmailAndPassword(
                //       registerDetails.fields.email,
                //       registerDetails.fields.password,
                //     )
                    NotificationManager.success('Please check your inbox and verify your email address.')
                    // res.user.sendEmailVerification({ url: getContinueURL(location.search) })
                    setLoading(false)
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
        let fields = registerDetails.fields
        let errors = registerDetails.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setRegisterDetails({ ...registerDetails, fields, errors })
    }
    return (
        <div className="page_container">
            <div className="box mb-5">
                <div className="col-md-12 mt-3 px-0"><h3>Register here...</h3></div>
                <form className="form-signin " onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mt-3 px-0">
                            <input
                                type="name"
                                id="name"
                                className={`form-control${registerDetails?.errors?.name ? ' is-invalid' : ''}`}
                                placeholder="Name"
                                value={registerDetails?.fields?.name || ''}
                                onChange={(e) => handleChange(e, 'name')}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mt-3 px-0">
                            <input
                                type="email"
                                id="email"
                                className={`form-control${registerDetails?.errors?.email ? ' is-invalid' : ''}`}
                                placeholder="Email"
                                value={registerDetails?.fields?.email || ''}
                                onChange={(e) => handleChange(e, 'email')}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mt-3 px-0">
                            <div class="form-group">
                                <select class="form-control" id="gender">
                                    <option>Select Gender</option>
                                    <option  value={registerDetails?.fields?.gender || ''}>Male</option>
                                    <option  value={registerDetails?.fields?.gender || ''}>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 ">
                        <div className="col-md-12 mt-3 px-0">
                            <input
                                type="password"
                                id="password"
                                className={`form-control${registerDetails?.errors?.password ? ' is-invalid' : ''}`}
                                placeholder="Password"
                                value={registerDetails?.fields?.password || ''}
                                onChange={(e) => handleChange(e, 'password')}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        {console.log(registerDetails?.errors?.confirmPass)}
                        <div className="col-md-12 mt-3 px-0">
                            <input
                                type="password"
                                id="confirmPass"
                                className={`form-control${registerDetails?.errors?.confirmPass ? ' is-invalid' : ''
                                    }`}
                                placeholder="Confirm Password"
                                value={registerDetails?.fields?.confirmPass || ''}
                                onChange={(e) => handleChange(e, 'confirmPass')}
                            />
                        </div>
                    </div>
                    <div className="button mt-3" onClick={handleSubmit}>
                        {/* {loading && (
                            <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
                        )} */}
                        <div className="buttonText">Register</div>
                    </div>

                </form>
            </div>
            <div className="mt-2 mb-3">
                Already have an account ?{' '}
                <span
                    className="navLink mt-2"
                    onClick={() =>
                        history.push({
                            pathname: 'login',
                            search: location.search,
                        })
                    }
                >
                    Sign In
        </span>
            </div>
        </div>
    )
}

export default Register
