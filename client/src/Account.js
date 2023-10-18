import React, {useState, useContext} from "react";
import { Button } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";
function Account({}) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);


    async function handleSignout() {
        const r = await fetch('/logout', {
            method: 'DELETE'
        });
        console.log(r)
        setCurrentUser(null);   
    }
    return (
        <div>
            <Button className="btn" onClick={handleSignout}>Sign Out</Button>
        </div>
    )
}

export default Account;