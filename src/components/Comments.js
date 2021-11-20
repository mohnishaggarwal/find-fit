import React, { useState, useEffect } from 'react';
import CommentsService from '../services/CommentsService';

function Comments(regime) {


    useEffect(() => {
        CommentsService.fetchComments(regime);
        CommentsService.addComment(regime, "Cool regime!");
    })


    return (
        <div className="comments-section">
            
        </div>
    )
}

export default Comments
