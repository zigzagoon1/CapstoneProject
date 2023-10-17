import React from "react";
import { NavLink } from "react-router-dom";
function NavBar() {
    return(
        <div className="container">
            <div className="row">
                <div className="navbar nav-tabs justify-content-center">
                    <div className="col nav-item">
                        <NavLink className="nav-link text-center" to="/">Home</NavLink>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default NavBar;