import { db } from "../firebase"
import React, { useEffect } from "react";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import GetData from "../data/getdata";
import GetShortRecipe from "../data/getShortRecipe";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import Comments from './comments/Comments';


function RenderRecipes(props) {

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

    const steps = [];

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

    for (let i = 0; i < props.recipeIds.length; i++) {
        const recipe = () => {
            console.log(props.recipeIds[i])
            localStorage.setItem('recipe_id', props.recipeIds[i]);
            window.location.assign('/recipe')
        }

        steps.push(

          <div className="card" key={i}>
            <div onClick={recipe}>
              <h2>
                <GetData collection="Upload" document={props.recipeIds[i]} field="Title" />
              </h2>
              <h4>
                Cost: $
                <GetData collection="Upload" document={props.recipeIds[i]} field="Cost" />
              </h4>
              Recipe:&nbsp;
              <GetShortRecipe collection="Upload" document={props.recipeIds[i]} field="Recipe" />
            </div>
            <h5>Recipe provided by:&nbsp;<GetData collection="Upload" document={props.recipeIds[i]} field="UserName" /></h5>
            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(props.recipeIds[i]);
                }}>Favorite</button>

                <button className="btn" onClick={() => {
                    MadeThisHandler(props.recipeIds[i]);
                }}>I Made This:&nbsp;
                <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" />
                </button>
             </div>
           </div>)
        steps.push(<br key={(i+1)*(-1)}></br>)

    }
    
    let trisect = (steps.length / 3);
    const left = steps.slice(0, trisect);
    const middle = steps.slice(trisect, trisect * 2);
    let right = steps.slice(trisect * 2, steps.length);

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

export default RenderRecipes;