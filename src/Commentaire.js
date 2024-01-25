// CommentaireComponent.js
import React, { useState } from "react";

const CommentaireComponent = ({ onCommentChange }) => {
  const [commentaire, setCommentaire] = useState("");

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setCommentaire(newComment);
    onCommentChange(newComment);
  };

  return (
    <div>
      <textarea
        rows="4"
        placeholder="Laissez un commentaire..."
        value={commentaire}
        onChange={handleCommentChange}
      />
    </div>
  );
};

export default CommentaireComponent;
