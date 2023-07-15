import { useEffect, useState } from "react";
import Note from "./Note";
import { serverUrl } from "../serverUrl";

function RenderNote() {
  const [allNotes, setAllNotes] = useState([]);

  const getNotes = () => {
    fetch(`${serverUrl}notes`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAllNotes(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const notesChange = (heading, text) => {
    const updatedNotes = allNotes.filter(
      (note) => note.heading !== heading || note.text !== text
    );
    setAllNotes(updatedNotes);
  };

  return (
    <>
      {allNotes.length === 0 && <h1>No Notes are currently present</h1>}
      {allNotes.length !== 0 &&
        allNotes.map((note, index) => (
          <Note
            key={index}
            heading={note.heading}
            text={note.text}
            noteschange={notesChange}
          />
        ))}
    </>
  );
}

export default RenderNote;
