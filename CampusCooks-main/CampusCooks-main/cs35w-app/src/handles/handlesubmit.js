import { addDoc, collection } from "@firebase/firestore"
import { db } from "../firebase"

const handleSubmit = (data1, data2) => {
    const ref = collection(db, "users") // Firebase creates this automatically

    let data = {
        field1: data1,
        field2: data2
    }

    try {
        addDoc(ref, data)
        console.log(ref.path)
    } catch (err) {
        console.log(err)
    }
}

export default handleSubmit