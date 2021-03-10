import React from 'react'
import { Link } from 'react-router-dom'
import * as actions from '../redux/action/userAction'
import { useSelector, useDispatch } from 'react-redux'
function Navbar() {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => ({
        token: state.authentication.token,
    }))
    return (
        <div className="header">
            <div id="header_section">
                <div id="search_box">
                    <form method="get" action="#">
                        <input type="text" name="searchfield" id="search_field" title="searchfield" />
                        <input type="submit" name="search" value="" alt="Search" id="search_button" title="Search" />
                    </form>
                </div>
            </div>
            <div id="menu_panel">
                <div id="menu_section">
                    <ul>
                        <li> <Link to={"/"}>Home</Link></li>
                        <li><Link to={"/"}>About</Link></li>
                        {token ? (
                            <>
                                <li><Link to={"/blogs"}>Blogs</Link></li>
                                <li><Link onClick={() => dispatch(actions.logout())} to={"/"}>Logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to={"/login"}>Sign in</Link></li>
                                <li><Link to={"/register"}>Sign up</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
