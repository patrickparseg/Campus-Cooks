import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";



function GetFavID(props) {
    let [data, setData] = React.useState([]);
    let list = []
    console.log("op", props)
    React.useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", props);
            const docSnap = await getDoc(docRef);
            console.log("b4")
            if (docSnap.exists()) {
                const ids = docSnap.data();
                console.log(ids.favorite_recipe)
                console.log("after")
                setData(ids.favorite_recipe)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }



        };
        fetchData();

    }, []);

    return data;


}
export default GetFavID;

