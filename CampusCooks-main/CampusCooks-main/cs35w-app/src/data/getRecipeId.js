import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";



function GetRecipeID(props) {
    let [data, setData] = React.useState([]);
    let list = []
    React.useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Upload"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                data = (doc.id)
                //data += list;
                list.push(data);
                //console.log("11", list)
                //console.log(typeof (list))
                setData(list)


            });

        };
        fetchData();

    }, []);

    return data;


}
export default GetRecipeID;

