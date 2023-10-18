import React, {useContext, useState} from "react";
import { CurrentUserContext } from "./context/current_user";
import { Link } from "react-router-dom";
function Signup({}) {
    const defaultValues = {
        name: "",
        username: "",
        password: "",
        password_confirmation: ""
    };

    const [values, setValues] = useState(defaultValues);
    const [signupComplete, setSignupComplete] = useState(false);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [showPassword, setShowPassword] = useState(false);


    const signupCompleteDiv = 
    <div id="sign-up-complete" className="container-flex text-center my-5">
        <p>Signup Complete! Welcome, {currentUser}!</p>
    </div>

    function handleValueChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: values.name,
            username: values.username,
            password: values.password,
            password_confirmation: values.password_confirmation,
        }
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(newUser)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((createdUser) => {
                    console.log(createdUser);
                    setSignupComplete(true);
                    setCurrentUser(createdUser.username);
                })
            }
            else {
                alert("Username is already taken! Please try a different one.")
            }
        })



        
        //send signup request to backend to create a new user
    }

    return ( signupComplete ? signupCompleteDiv : 
        <div id="signup" className="container-flex m-4 p-4">
            <form onSubmit={handleSubmit}>
               <div className="row justify-content-center">
                <label className="col-4 my-2" htmlFor="name">Name:</label>
                <input className="col-6 my-2" type="text" name="name" onChange={handleValueChange} value={values.name}></input>
                <label className="col-4 my-2" htmlFor="username">Username:</label>
                <input className="col-6 my-2" type="text" name="username" onChange={handleValueChange} value={values.username}></input>
                <label className="col-4 my-2" htmlFor="password">Password:</label>
                <input className="col-6 my-2" type="password" name="password" onChange={handleValueChange} value={values.password}></input>
                <label className="col-4 my-2" htmlFor="password_confirmation">Confirm Password:</label>
                <input className="col-6 my-2" type="password" name="password_confirmation" onChange={handleValueChange} value={values.password_confirmation}></input>
                <button className="col-3 my-4 btn btn-success" type="submit">Signup</button>
                <Link className=" col-12 btn btn-outline-dark" role="button" to="/login">Already a member? Login instead!
                </Link>
               </div>
            </form>
        </div>
    )
}


export default Signup;