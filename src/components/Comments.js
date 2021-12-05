import React, { useState, useEffect } from 'react';
import CommentsService from '../services/CommentsService';
import './comments.css'

function Comments({regime}) {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        CommentsService.fetchComments(regime, setComments);
    }, []);

    function submitComment(event) {
        event.preventDefault();
        if (userComment.length === 0) {
            setErrorMsg("Cannot submit an empty comment!")
        }
        else {
            CommentsService.addComment(regime, userComment);
            setUserComment("");
            CommentsService.fetchComments(regime, setComments);
            setErrorMsg("")
        }
    }

    function submitCommentEnter(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            if (userComment.length === 0) {
                setErrorMsg("Cannot submit an empty comment!")
            }
            else {
                CommentsService.addComment(regime, userComment);
                setUserComment("");
                CommentsService.fetchComments(regime, setComments);
                setErrorMsg("")
            }
        }
    }

    function handleChange(event) {
        setUserComment(event.target.value);
    }


    return (
        <div className="entire-section">
            <div className="comments-section">
                <div className="comment-title">Comments</div>
                {
                    comments.map((comment, idx) => {
                        return (
                            <div key={idx} className="comment">
                                <p><b className="anon">Anonymous:&nbsp;</b>{comment.comment}</p>
                                <p>{(comment.time.getMonth()+1).toString()}/{comment.time.getUTCDate().toString()}/{comment.time.getFullYear().toString()}</p>
                            </div>
                        )
                    })
                }
                <form onSubmit={submitComment} className="form">
                    <label>
                        <b onKeyDown={submitCommentEnter}>Submit an anonymous comment: &nbsp;</b>
                        <input type="text" value={userComment} onChange={handleChange} />
                    </label>
                    <input type="submit" value="Submit" className="submit-button"/>
                    <p className="errorMsg">{errorMsg}</p>
                </form>
            </div>
        </div>
    )
}

export default Comments
