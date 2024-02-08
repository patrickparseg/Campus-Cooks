import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import React from "react";

function GetShortRecipe(props) {
    let [data, setData] = React.useState("");
    const docRef = doc(db, props.collection, props.document);
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await getDoc(docRef);
            //console.log(response.data());
            data = response.get(props.field).substring(0,200) + "...\n...Click to see more!";
            //console.log(data);
            setData(data);
        };
        fetchData();
    }, []);

    return data

}





export default GetShortRecipe;

