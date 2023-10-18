import React from "react";
import { NavLink } from "react-router-dom";
function NavBar() {
    return(
        <div className="container-flex bg-light">
            <div className="row">
                <div className="navbar nav-pills justify-content-center">
                    <div className="col-3 nav-item">
                        <NavLink className="nav-link text-center" to="/">Home</NavLink>
                    </div>
                    <div className="col-3 nav-item">
                    <NavLink className="nav-link text-center" to="/games">Games</NavLink>
                    </div>
                    <div className="col-3 nav-item">
                        <NavLink className="nav-link text-center" to="/users">Members</NavLink>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NavBar;