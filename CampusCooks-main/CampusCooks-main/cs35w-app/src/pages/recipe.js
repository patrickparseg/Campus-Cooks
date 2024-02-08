import GetData from "../data/getdata";
import { getDoc, doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";


import React from 'react';
import { db } from "../firebase";
import GetLists from "../data/getIngredientList";


const Recipe = () => {
    let userData = localStorage.getItem('recipe_id');
    console.log(userData)

    const favHandler = (id) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                try {
                    await updateDoc(userRef, {
                        favorite_recipe: arrayUnion(id)
                    });
                } catch (err) {
                    console.log(err)
                }
                alert('This recipe is added to your favorite successfully! :D');
            }
            else {
                alert("You must sign in before favoriting this recipe!");
                window.location.assign("/log_in");
            }
        });
    };


    async function MadeThisHandler(id) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const ref = doc(db, "Upload", id);

                await updateDoc(ref, {
                    upvotes: increment(1)
                });
                console.log(ref)
                window.location.reload(false);

            }
            else {
                alert("You must sign in before upvoting this recipe!");
                window.location.assign("/log_in");
            }
        });


    }
    const [state, setState] = useState()

    function handleSubmit(e) {

        e.preventDefault();
        const comment = document.getElementById('uploadComment').value;
        if (comment.trim() === "") {
            alert("Comment cannot be empty");
            return;
        }

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const username = user.email
                const str = username + '`' + document.getElementById('uploadComment').value
                const ref = doc(db, "Upload", userData,);
                console.log(document.getElementById('uploadComment').value)
                let result = await updateDoc(ref, {
                    Comments: arrayUnion(str)
                });
                setState(result)
                console.log(result);

            }
            else {
                alert("You must sign in before upload your comment!");
                window.location.assign('log_in');
            }
            document.getElementById("uploadComment").value = "";
            window.location.reload(false);
        });
    };


    const [user_id, setId] = useState();
    const getData = async (userData) => {
        const docRef = doc(db, "Upload", userData);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setId(data.UserId);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    };

    getData(userData);

    const profile = () => {
        console.log(user_id);
        localStorage.setItem("user_id", user_id)
        window.location.assign('/others')
    }

    return (
        <div className="card-center">
            <h2><strong><GetData collection="Upload" document={userData} field="Title" /></strong></h2>
            <div><strong>Recipe provided by: <button onClick={profile}><GetData collection="Upload" document={userData} field="UserName" /></button></strong></div>
            <br></br>
            <GetData collection="Upload" document={userData} field="Recipe" />
            <br></br>
            <br></br>
            <div>            <GetLists collection="Upload" document={userData} field="Ingredients" />
            </div>
            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(userData);
                }}>Favorite</button>

                <button className="btn" onClick={() => {
                    MadeThisHandler(userData);
                }}>I Made This  <GetData collection="Upload" document={userData} field="upvotes" />
                </button></div>
            <br></br>
            <GetLists collection="Upload" document={userData} field="Comments" />
            <br></br>
            <form >
                <div>
                    <div> <label>
                        Comment: <br />
                    </label>
                        <textarea id="uploadComment" type='text' rows="10" cols="45" placeholder='Write your comment here!' /></div>
                    <div> <input className='btn' onClick={handleSubmit} type="submit" value="Submit" /></div>

                </div>
            </form>
        </div >
    );

}

export default Recipe;