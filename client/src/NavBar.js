import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "./context/current_user";
function NavBar() {

    const currentUser = useContext(CurrentUserContext);

    

    const signup =                    
    <div className="col-3 nav-item">
        <NavLink className="nav-link text-center" to="/signup">Account</NavLink>
    </div>

    const account = 
    <div className="col-3 nav-item">
        <NavLink className="nav-link text-center" to="/account">Account</NavLink>
    </div>

    console.log(currentUser);
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
                    {currentUser[0] ? account : signup/* <div className="col-3 nav-item">
                        <NavLink className="nav-link text-center" to="/signup">Account</NavLink>
                    </div> */}
                </div>

            </div>

        </div>
    )
}

export default NavBar;