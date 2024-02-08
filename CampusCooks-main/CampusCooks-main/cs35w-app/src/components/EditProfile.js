import { React, useState } from 'react';
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../firebase"
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';


const EditProfile = () => {
    const auth = getAuth();
    const [User, setUser] = useState(null);
    let filename = '';
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }
        else {
            alert("you are not log in");
            window.location.assign("/log_in");
        }
    });


    const uploadHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        if (file == null) return;
        filename = file.name;
        const photoRef = ref(storage, "/UserImg/" + User.email + "/" + filename);
        uploadBytes(photoRef, file).then(() => {
            alert("Image Uploaded");
        });
    };

    const saveHandler = async () => {
        const name = document.getElementById("fname").value;
        const userRef = doc(db, "users", User.uid);

        console.log(filename);
        if (filename != '') {
            const photoRef = ref(storage, "/UserImg/" + User.email + "/" + filename);
            const UserPhotoURL = await getDownloadURL(photoRef);
            updateProfile(User, {
                photoURL: UserPhotoURL
            });
            await updateDoc(userRef, {
                photoURL: UserPhotoURL
            });
        }
        if (name != '') {
            updateProfile(User, {
                displayName: name
            });
            await updateDoc(userRef, {
                displayName: name
            });
        }
        if (document.getElementById("color").value != "") {
            await updateDoc(userRef, {
                FavoriteColor: document.getElementById("color").value
            });
        }
        if (document.getElementById("bio").value != "") {
            await updateDoc(userRef, {
                bio: document.getElementById("bio").value
            });
        }
        if (document.getElementById("gender").value != "") {
            await updateDoc(userRef, {
                gender: document.getElementById("gender").value
            });
        }
        if (document.getElementById("birthday").value != "") {
            await updateDoc(userRef, {
                birthday: document.getElementById("birthday").value
            });
        }
        document.getElementById("bioform").reset();
        document.getElementById("photoform").reset();
        window.location.assign('/user');
    };


    return (
        <div>
            <h1> Welcome to edit page. You can edit your information here.</h1>
            <form className='cardTextArea' id='bioform'>
                <div>
                    <label> Username: </label>
                    <input type="text" id="fname" name="fname"></input><br /><br />
                    <label> Favorite Color: </label>
                    <input type="text" id="color" name="color"></input><br /><br />
                    <label> Birthday: </label>
                    <input type="text" id="birthday" name="birthday"></input><br /><br />
                    <label> Gender: </label>
                    <input type="text" id="gender" name="gender"></input><br />
                    <br />
                    <label> About Me:  <br /> </label>
                    <textarea type="text" id="bio" name="bio" rows="10" cols="45" ></textarea><br />
                </div>
                <br />
            </form>
            <form onSubmit={uploadHandler} className='cardTextArea' id='photoform'>
                <p>
                    Note: Please click on the "Upload Image" after you choose <br/>
                    your image file. Otherwise, your image file will not be save <br/>
                    even you click the save button.
                </p>
                <label> Photo: </label>
                <input type="file" />
                <button type="submit"> Upload Image</button>
            </form>
            <button className='btn' onClick={saveHandler}>Save</button>

        </div >
    )
}

export default EditProfile