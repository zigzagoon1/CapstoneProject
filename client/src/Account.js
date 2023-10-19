import React, {useState, useContext} from "react";
import { Button, Card } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";
import { FaUser } from "react-icons/fa";
function Account({}) {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [editProfileActive, setEditProfileActive] = useState(false)

    // const defaultValues = {
    //     name: currentUser.name ? currentUser.name : "",
    //     bio: currentUser.bio ? currentUser.bio : "",
    //     // photo: currentUser.photo ? currentUser.photo : ""
    // }

    
    const [values, setValues] = useState({name: currentUser.name, bio: currentUser.bio ? currentUser.bio : ""})

    const getProfileIcon = (currentUser) => {
        if(currentUser.photo) {
            console.log("user photo not null")
            return <img id="user-profile-img" src={currentUser.photo.src} alt="Profile"/>;
        }
        else {
            return <FaUser id="user-profile-img"  size="100"/>
        }
    }

    function handleValueChange(e) {
        // if (fieldName === "photo") {
        //     const selectedFile = e.target.files[0];
        //     setValues({...values, [fieldName]: selectedFile})
        // }
        //else {
            const {name, value} = e.target;
            setValues({...values, [name]: value,
            });
        //}

    }

    const profile = <Card>
    <h1 className="text-center">Profile</h1>
       <div id="profile" className="row justify-content-center">
           {getProfileIcon(currentUser)}
           <label className="col-12 text-center" htmlFor="name">Name: {currentUser.name}</label>
           <label className="col-12 text-center" htmlFor="username">Username: {currentUser.username}</label>
           <label className="col-12 text-center" htmlFor="bio">Bio: {currentUser.bio}</label>
           <label className="col-12 text-center" htmlFor="games_played">Number of Games Played: {currentUser.games_played}</label>
           <label className="col-12 text-center" htmlFor="games">Games: {currentUser.games}</label>
           <Button className="btn col-2 my-2" onClick={handleEdit}>Edit Profile</Button>
       </div>
</Card>


    const editProfile = <Card id="profile" className="row justify-content-center">
        {getProfileIcon(currentUser)}
        <form>
        <input type="file" accept="image/jpeg, image/png" onChange={(e) => handleValueChange(e, "photo")}></input>
    <label className="col-12 text-center" htmlFor="name">Name: </label>
    <input className="col-3" type="text" name="name" onChange={handleValueChange} value={values.name}/>
    <label className="col-12 text-center" htmlFor="bio" >Bio: </label>
    <input className="col-12" type="text" name="bio" onChange={handleValueChange} value={values.bio} />
    <Button className="btn col-2 my-2" onClick={handleSave}>Save Profile</Button>
    </form>
</Card>



    async function handleSignout() {
        const r = await fetch('/logout', {
            method: 'DELETE'
        });
        console.log(r)
        setCurrentUser(null);   
    }

    async function handleSave(e) {
        e.preventDefault();
        const updatedUser = {
            ...currentUser, name: values.name, photo: values.photo, bio: values.bio,
        };
        console.log(updatedUser)
         await fetch(`/users/${currentUser.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((updated) => {
                    console.log(updated);
                    setCurrentUser(updated);
                })
            }
        })
        setEditProfileActive(false);
    }


    function handleEdit() {
        setEditProfileActive(true);
    }

    return ( !currentUser? <p>No one is logged in.</p> :
        <div className="container-flex">
            {editProfileActive ? editProfile : profile}
             <div className="row justify-content-center">
                <Button className="btn col-3 my-2" onClick={handleSignout}>Sign Out</Button>
                </div>
        </div> 
    )
}

export default Account;