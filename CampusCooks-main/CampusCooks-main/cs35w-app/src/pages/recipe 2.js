import GetData from "../data/getdata";

import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import React from 'react';
import { db } from "../firebase";


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

    // const getUserData = async () => {
    //     const docRef = doc(db, "Upload", userData);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //         const ids = docSnap.data();
    //         console.log(ids.UserId)
    //         return ids.UserId
    //     } else {
    //         console.log("No such  document!");
    //     }
    // };
    // let ids;
    // const [data, setData] = useState();
    // useEffect(() => {
    //     const getData = async () => {

    //         ids = await getUserData();
    //         console.log("ids", ids)
    //         setData(ids)
    //         console.log("data", data)

    //     };
    //     getData();
    // }, []);


    return (
        <div className="card">
            <GetData collection="Upload" document={userData} field="Title" />
            <br></br>
            <GetData collection="Upload" document={userData} field="Recipe" />
            <br></br>
            <GetData collection="Upload" document={userData} field="UserName" />
            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(userData);
                }}>Favorite</button>

                <button className="btn" onClick={() => {
                    MadeThisHandler(userData);
                }}>I Made This  <GetData collection="Upload" document={userData} field="upvotes" />
                </button></div>
        </div >
    );

}

export default Recipe;