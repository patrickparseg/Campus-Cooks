import { React, useState } from 'react';
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const edit = () => {
  window.location.assign('/edit')
}
const favorite = () => {
  window.location.assign('/favorite')
}

const Profile = () => {
  const auth = getAuth();
  const [User, setUser] = useState(null);
  const [FavoriteColor, setColor] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [birthday, setBirthday] = useState(" ");
  const [gender, setGender] = useState(" ");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
    else {
      alert("you are not log in");
      window.location.assign("/log_in");
    }
  });



  if (User) {
    //Sets up default user name and photo since they were null after the user created their account
    if (User.displayName == null && User.photoURL == null) {
      updateProfile(User, {
        displayName: "Guest", photoURL: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png"
      });
    }

    const getUserData = async () => {
      const docRef = doc(db, "users", User.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setBio(data.bio);
        setColor(data.FavoriteColor);
        setBirthday(data.birthday);
        setGender(data.gender);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getUserData();


    return (
      <div >
        <h1> My profile</h1>
        <img id="photoHolder" src={User.photoURL} alt="Profile picture" width="100"></img>
        <button onClick={edit} className='btn'>Edit Profile</button>
        <button onClick={favorite} className='btn'>Your Favorites</button>
        <h2 className='card'>Name: {User.displayName}</h2>
        <h2 className='card'>Email: {User.email}</h2>
        <h2 className='card'>Join date: {User.metadata.creationTime}</h2>
        <h2 className='card'>Last Log in: {User.metadata.lastSignInTime}</h2>
        <h2 className='card'>Favorite Color: {FavoriteColor} </h2>
        <h2 className='card'>Birthday: {birthday} </h2>
        <h2 className='card'>Gender: {gender} </h2>
        <h2 className='card'>About Me:
          <p> {bio} </p>
        </h2>
      </div>
    )
  };

}


function UserProfile() {
  return (
    <Profile />
  );
};

export default UserProfile;