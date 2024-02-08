import { useState } from "react";
import Modal from './Modal';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"


function Recipe(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function imageHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }


    return (
        <div>
            <div>{modalIsOpen && <Modal onCancel={closeModalHandler} />} </div>
            <img className='images' src={require(`../images/${props.text}.jpg`)} alt={props.text} onClick={imageHandler} />
        </div >
    )
}

export default Recipe;
