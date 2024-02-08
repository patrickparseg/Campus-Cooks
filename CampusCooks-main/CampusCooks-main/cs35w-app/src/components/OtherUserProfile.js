import { doc, getDoc } from "firebase/firestore";
import { React, useState } from 'react';
import { db } from "../firebase";

const OtherProfiles = () => {
    let id = localStorage.getItem("user_id");
    const [FavoriteColor, setColor] = useState(" ");
    const [bio, setBio] = useState(" ");
    const [birthday, setBirthday] = useState(" ");
    const [gender, setGender] = useState(" ");
    const [photoURL, setPhoto] = useState(" ");
    const [displayName, setName] = useState(" ");
    const [email, setEmail] = useState(" ");

    const getUserData = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.bio);
          setColor(data.FavoriteColor);
          setBirthday(data.birthday);
          setGender(data.gender);
          setPhoto(data.photoURL);
          setName(data.displayName);
          setEmail(data.email);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };

    getUserData(id);
    return (
        <div >
        <h1> {displayName}'s profile</h1>
        <img id="photoHolder" src={photoURL} alt="Profile picture" width="100"></img>
        <h2 className='card'>Name: {displayName}</h2>
        <h2 className='card'>Email: {email}</h2>
        <h2 className='card'>Favorite Color: {FavoriteColor} </h2>
        <h2 className='card'>Birthday: {birthday} </h2>
        <h2 className='card'>Gender: {gender} </h2>
        <h2 className='card'>About Me:
          <p> {bio} </p>
        </h2>
      </div>
    );
};

export default OtherProfiles;
