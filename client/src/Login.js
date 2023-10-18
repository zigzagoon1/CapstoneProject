import React, {useState} from "react";

function Login({}) {
    const defaultValues = {
        username: "",
        password: ""
    }

    const [values, setValues] = useState(defaultValues)

    function handleSubmit(e) {
        e.preventDefault();

        fetch("/login")

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
                <input className="col-6 my-2" type="text" name="password" onChange={handleValueChange} value={values.password}></input>
                <button className="col-3 my-4 btn btn-success" type="submit">Signup</button>
               </div>
            </form>
        </div>
    )
}


export default Login;