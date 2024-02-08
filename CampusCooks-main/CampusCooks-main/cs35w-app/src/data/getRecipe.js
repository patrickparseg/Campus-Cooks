import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";



function GetRecipes(props) {
    let [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Upload"));
            querySnapshot.forEach((doc) => {
                let list;
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                list = (doc.get("Recipe"))
                //data += list;
                data = (data + list + "\n\n\n\n");
                console.log("11", list)
                console.log(typeof (list))
                setData(data)


            });

        };
        fetchData();

    }, []);

    return (
        <div>
            <p>
                {data}</p>
        </div>
    );
}
export default GetRecipes;

