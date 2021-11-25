import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import CommentComponent from './CommentComponent';
import _ from 'lodash';
import AddCommentComponent from './AddCommentComponent';

const CommentsListComponent = () => {
  const params = useParams();
  const { userId } = params;
  const [allUsers, setAllUsers] = useState();

  const [comments, setComments] = useState();
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    api.users.fetchAll().then((data) => setAllUsers(data));
  }, []);
  const handleDelete = (id) => {
    api.comments.remove(id).then(() => api.comments.fetchCommentsForUser(userId).then((data) => setComments(data)));
  };
  const handleAddNewComment = (comment) => {
    console.log(comment);
    api.comments.add(comment).then(() => api.comments.fetchCommentsForUser(userId).then((data) => setComments(data)));
  };
  const sortedComments = _.orderBy(comments, 'created_at', 'desc');

  return <>
    <div className="card mb-2">
      {allUsers && <AddCommentComponent onAdd={handleAddNewComment} users={allUsers} />}
      {!allUsers && <h2 className="p-3">Loading....</h2>}
    </div>
    <div className="card mb-3">
      <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {comments && sortedComments.map((comment) => {
            return <CommentComponent key={comment._id} comment={comment} onDelete={handleDelete} />;
          })}
          {!comments && <h2 className="p-3">Loading....</h2>}
      </div>
    </div>
  </>;
};

export default CommentsListComponent;
