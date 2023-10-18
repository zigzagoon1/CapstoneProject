import React, {useState, useContext} from "react";
import { CurrentUserContext } from "./context/current_user";

function Login({}) {
    const defaultValues = {
        username: "",
        password: ""
    }

    const [values, setValues] = useState(defaultValues)
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);


    function handleSubmit(e) {
        const userCredentials = {
            username: values.username,
            password: values.password
        }

        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials)
        })
        .then(r => r.json())
        .then((user) => {
            console.log(user);
            setCurrentUser(user.username)
        })

    }

    function handleValueChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value,
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
               <div className="row justify-content-center">
                <label className="col-4 my-2" htmlFor="username">Username:</label>
                <input className="col-6 my-2" type="text" name="username" onChange={handleValueChange} value={values.username}></input>
                <label className="col-4 my-2" htmlFor="password">Password:</label>
                <input className="col-6 my-2" type="password" name="password" onChange={handleValueChange} value={values.password}></input>
                <button className="col-3 my-4 btn btn-success" type="submit">Login</button>
               </div>
            </form>
        </div>
    )
}


export default Login;