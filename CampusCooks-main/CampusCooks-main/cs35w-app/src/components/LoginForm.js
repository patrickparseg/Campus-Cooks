import handleSubmit from '../handles/handlesubmit';
import { useRef } from 'react';
import { db, auth } from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';



function LogininForm(props) {
    const dataRef = useRef()
    const dataRef2 = useRef()

    const submithandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
                console.log(userCredential)
                setDoc(doc(db, "users", userCredential.user.uid), {
                    bio: "This user haven't write anything yet",
                    gender: " ",
                    birthday: " ",
                    FavoriteColor: " ",
                    displayName: "Guest",
                    photoURL: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
                    email: userCredential.user.email
                })
                document.getElementById("signinForm").reset();
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use!')
                        break;
                    case 'auth/weak-password':
                        alert('Password should be at least 6 characters!')
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email!')
                        break;
                    default:
                        alert(error.code);
                }
                console.log(error);
                document.getElementById("signinForm").reset();
            });
    }


    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
                console.log(userCredential)
                document.getElementById("signinForm").reset();
                alert("Log in successful! :D Redirecting to Homepage.");
                window.location = "/";
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        alert('Incorrect password')
                        break;
                    case 'auth/user-not-found':
                        alert('Email not found')
                        break;
                    default:
                        alert(error.code);
                }
                console.log(error.code);
                document.getElementById("signinForm").reset();
            });
    }

    return (
        <div>
            <form id="signinForm">
                <div className='listcard'>
                    <div>
                        <h2>{props.text}</h2>
                        <h3>Note: All input are case sensitive.</h3>
                        <label>
                            Email:&nbsp;
                            <input type="text" name="username" ref={dataRef}
                                onChange={(e) => dataRef.current = (e.target.value)} />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Password:&nbsp;
                            <input type="text" name="password" ref={dataRef2}
                                onChange={(e) => dataRef2.current = (e.target.value)} />
                        </label>
                    </div>
                    <br />
                    <div className='actions'>
                        <div className='rowC'>
                            <input className='btn' onClick={submithandler} type="submit" value="Create an Account" />
                            <input className='btn' onClick={loginHandler} type="submit" value="Log In" />
                        </div>
                    </div>
                </div>

            </form >

        </div>
    )
}
export default LogininForm;