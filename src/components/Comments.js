import React, { useState, useEffect } from 'react';
import CommentsService from '../services/CommentsService';
import './comments.css'

function Comments(regime) {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");

    useEffect(() => {
        let regime = "bodybuilding";    // delete later
        CommentsService.fetchComments(regime, setComments);
    }, []);

    function submitComment(event) {
        let regime = "bodybuilding";    // delete later
        event.preventDefault();
        console.log(userComment);
        CommentsService.addComment(regime, userComment);
        setUserComment("");
        CommentsService.fetchComments(regime, setComments);

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
                                <b className="anon">Anonymous:&nbsp;</b>{comment}
                            </div>
                        )
                    })
                }
                <form onSubmit={submitComment} className="form">
                    <label>
                        <b>Submit an anonymous comment: &nbsp;</b>
                        <input type="text" value={userComment} onChange={handleChange} />
                    </label>
                    <input type="submit" value="Submit" className="submit-button"/>
                </form>

            </div>
        </div>
    )
}

export default Comments
