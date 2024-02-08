import { db } from "../firebase"
import React from "react";
import { doc, getDoc } from "firebase/firestore";




function GetLists(props) {
    let [data, setData] = React.useState([]);
    let list = []
    console.log(props.document)
    React.useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "Upload", props.document);
            const t = await (await getDoc((docRef))).get(props.field)
            t.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc);
                data = (doc)
                list.push(doc);
                setData(list)
            });

        };
        fetchData();

    }, []);
    let steps = []
    if (props.field == 'Comments') {
        if (data.length > 0) {
            steps.push(<div><h4>Comments: </h4></div>)
        }
        for (let i = 0; i < data.length; i++) {
            const data_show = data[i].split('`')
            steps.push(<div className='listcard'><div>{data_show[0]} :</div>{data_show[1]}</div>)
        }
    } else if (props.field == 'Ingredients') {
        if (data.length > 0) {
            steps.push(<div><h4>Ingredients: </h4></div>)
        }
        for (let i = 0; i < data.length; i++) {
            steps.push(<li>{data[i]}</li>)
        }
        steps.push(<br></br>)
    }


    return steps;


}
export default GetLists;

