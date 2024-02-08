import { useEffect, useState } from "react";
import {getComments, createComment} from "./testApi";
import {getAuth} from "firebase/auth";
//import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getFirestore } from "firebase/firestore";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({currentUserId}) => {
    //const auth = getAuth();
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );
    const getReplies = commentId => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId)
        .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const addComment = (text,parentId) => {
        console.log('addComment',text,parentId);
        createComment(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    console.log('backendComments', backendComments);
    useEffect(() => {
        getComments().then((data) => {
            setBackendComments(data);
        });
    }, []);

    return (
    <div className="comments">
        <div className="comment-form-title">Comment</div>
        <CommentForm submitLabel="Post" handleSubmit={addComment}/>
        <div className = "comments-container">
            {
                rootComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} 
                    replies={getReplies(rootComment.id)} currentUserId={currentUserId}
                    activeComment={activeComment} setActiveComment={setActiveComment}
                    addComment={addComment}/>
                ))
            }
        </div>
        
    </div>
    );
};

export default Comments;