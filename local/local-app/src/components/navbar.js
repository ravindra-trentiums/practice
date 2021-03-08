import React from 'react'
import { Link } from 'react-router-dom'
import * as actions from '../redux/action/action'
import { useSelector, useDispatch } from 'react-redux'
function Navbar() {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => ({
        token: state.authentication.token,
    }))
    return (
        <div className="header p-0 m-0">
            <p data-item='Rohit'>PRACTICE</p>
            <section>
                <nav>
                    <ul class="menuItems">
                        <li> <Link data-item='Home' to={"/"}>Home</Link></li>
                        <li><Link data-item='Service' to={"/"}>Service</Link></li>
                        <li><Link data-item='Contact' to={"/"}>Contact</Link></li>
                        <li><Link data-item='About' to={"/"}>About</Link></li>
                        {token ? (
                            <>
                                <li><Link data-item='logout' onClick={() => dispatch(actions.logout())} to={"/"}>Logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link data-item='signUp' to={"/login"}>Sign in</Link></li>
                                <li><Link data-item='signIn' to={"/register"}>Sign up</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </section>
        </div>
    )
}

export default Navbar
