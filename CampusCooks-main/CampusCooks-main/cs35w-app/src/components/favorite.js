import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import RenderFavs from './RenderFavs';
import { useEffect, useState } from "react";

function Favorite() {

    const getUserData = async (userid) => {
        const docRef = doc(db, "users", userid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const ids = docSnap.data();
            return ids.favorite_recipe
        } else {
            console.log("No such  document!");
        }
    };

    let ids;
    const [data, setData] = useState({});
    useEffect(() => {
        const getUserId = async () => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    console.log(uid)
                    ids = await getUserData(uid);
                    if (ids) {
                        setData(ids);
                    }

                }
            })

        };
        getUserId();
    }, []);


    return (
        <div>
            <h1 className="card-center">Your favorited recipes:</h1>
            <div id="outer"><h3> <RenderFavs recipeIds={data} /></h3></div>
        </div>

    );


};

export default Favorite;