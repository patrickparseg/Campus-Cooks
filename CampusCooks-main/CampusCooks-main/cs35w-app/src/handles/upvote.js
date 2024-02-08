import { useState } from "react";
import { collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db, storage } from "../firebase"
import { doc, getDoc } from "firebase/firestore";



async function Upvote(id) {
    const ref = doc(db, "Upload", id);
    const [state, setState] = useState()
    let result = await updateDoc(ref, {
        upvotes: increment(1)
    });
    setState(result)
}

export default Upvote;