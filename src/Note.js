import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const NoteComponent = ({ onNoteChange, starSize="2x" }) => {
  const [note, setNote] = useState(0);

  const handleNoteChange = (newNote) => {
    setNote(newNote);
    onNoteChange(newNote);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={index < note ? "star-filled" : "star-empty"}
          onClick={() => handleNoteChange(index + 1)}
          style={{ fontSize: starSize }}
        />
      ))}
    </div>
  );
};

export default NoteComponent;
