import React, {useState, useContext} from "react";
import { CurrentUserContext } from "./context/current_user";

function Login({}) {
    const defaultValues = {
        username: "",
        password: ""
    }

    const [values, setValues] = useState(defaultValues)
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [showAccount, setShowAccount] = useState(false)

    const formDiv = <div>
    <form onSubmit={handleSubmit}>
       <div className="row justify-content-center">
        <label className="col-4 my-2" htmlFor="username">Username:</label>
        <input className="col-6 my-2" type="text" name="username" onChange={handleLoginValueChange} value={values.username}></input>
        <label className="col-4 my-2" htmlFor="password">Password:</label>
        <input className="col-6 my-2" type="password" name="password" onChange={handleLoginValueChange} value={values.password}></input>
        <button className="col-3 my-4 btn btn-success" type="submit">Login</button>
       </div>
    </form>
</div>

    function handleSubmit(e) {
        e.preventDefault();
        if (!currentUser) {
            const userCredentials = {
                username: values.username,
                password: values.password
            }
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCredentials)
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((user) => {
                        setCurrentUser(user)
                        setShowAccount(true);
                    })
                }
            })
        }
    }

    function handleLoginValueChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value,
        })
    }
    return ( !showAccount ? formDiv : 
        <div className="justify-content-center">
            <p className="text-center">Login Successful!</p>
        </div>
    )
}


export default Login;