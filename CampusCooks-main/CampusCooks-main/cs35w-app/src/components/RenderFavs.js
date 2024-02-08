

import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import GetData from "../data/getdata";
import GetRecipeID from "../data/getRecipeId";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';




function RenderFavs(props) {


    const unfavHandler = (id) => {
        //e.preventDefault();
        const auth = getAuth();

        //const ref = collection(db, "Upload");
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                console.log(userRef)
                console.log(id)
                try {
                    await updateDoc(userRef, {
                        favorite_recipe: arrayRemove(id)

                    });
                    window.location.reload(false);
                    //userRef.child("favorite_recipes").push(id)
                } catch (err) {
                    console.log(err)
                }
            }
            else {
                alert("You must sign in before favoriting this recipe!");
                window.location.assign("/log_in");
            }
        });
    };


    const steps = [];

    async function UpvoteHandler(id) {
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
    for (let i = 0; i < props.recipeIds.length; i++) {
        const recipe = () => {
            console.log(props.recipeIds[i])
            localStorage.setItem('recipe_id', props.recipeIds[i]);
            window.location.assign('/recipe')

        }

        steps.push(<div className="card" key={'recipe:' + i}>
            <div onClick={recipe}><h2><GetData collection="Upload" document={props.recipeIds[i]} field="Title" /></h2></div>
            <div onClick={recipe}><GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" /></div>
            <div onClick={recipe}> <h5>Catergory: <GetData collection="Upload" document={props.recipeIds[i]} field="Catergory" /> </h5></div>
            <div onClick={recipe}><h5>Recipe provided by < GetData collection="Upload" document={props.recipeIds[i]} field="UserName" /></h5></div>
            <div><h5>This recipes has been made <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" /> time(s)</h5></div>
            <div>
                <button className="btn btn--alt" onClick={() => {
                    unfavHandler(props.recipeIds[i]);
                }}>Unfavorite</button>
                <button className="btn" onClick={() => {
                    UpvoteHandler(props.recipeIds[i]);
                }}>I Made This Today</button></div><br></br></div>)
        steps.push(<br></br>)
    }

    let trisect = steps.length / 3 + (steps.length % 3);
    const left = steps.slice(0, trisect);
    const middle = steps.slice(trisect, trisect * 2);
    const right = steps.slice(trisect * 2, steps.length);

    return (
        <div class="row">
            <div class="column">
                {left}
            </div>
            <div class="column">
                {middle}
            </div>
            <div class="column">
                {right}
            </div>
        </div>
    );

}





export default RenderFavs;

