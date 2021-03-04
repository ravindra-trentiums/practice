import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
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
                        <li><Link data-item='signUp' to={"/login"}>Sign in</Link></li>
                        <li><Link data-item='signIn' to={"/register"}>Sign up</Link></li>
                    </ul>
                </nav>
            </section>



            {/* <div class="navbar navbar-expand-lg bg-dark navbar-dark nav-sticky">
                <div class="container-fluid">
                    {/* <a href="index.html" class="navbar-brand"> <span>X</span></a>
                    <Link className="navbar-brand" to={"/"}>PRACTICE</Link>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav ml-auto">
                           
                        </div>
                    </div>
                </div>
            </div>
     */}
        </div>
    )
}

export default Navbar
