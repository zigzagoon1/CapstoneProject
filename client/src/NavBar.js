import React, {useContext, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "./context/current_user";
function NavBar() {

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    const signup =                    
    <div className="col-3 nav-item">
        <NavLink className="nav-link text-center" to="/signup">Account</NavLink>
    </div>

    const account = 
    <div className="col-3 nav-item">
        <NavLink className="nav-link text-center" to="/account">Account</NavLink>
    </div>

    const nav = currentUser[0] === undefined ? signup : currentUser[0] === null ? signup : account

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
                    {/* <div className="col-3 nav-item">
                        <NavLink className="nav-link text-center" to="/users">Members</NavLink>
                    </div> */}
                    {nav/* <div className="col-3 nav-item">
                        <NavLink className="nav-link text-center" to="/signup">Account</NavLink>
                    </div> */}
                </div>

            </div>

        </div>
    )
}

export default NavBar;