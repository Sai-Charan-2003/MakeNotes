import "./Note.css";
import { FaTrash } from "react-icons/fa";

function Note(props) {
  //eslint-disable-next-line
  var response;
  const handleDelete = () => {
    fetch("http://localhost:4000/delete", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        heading: props.heading,
        text: props.text,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((r) => (response = r))
      .catch((err) => console.log(err));
    props.noteschange(props.heading, props.text);
  };

  return (
    <div className="note">
      <FaTrash className="delete-icon" onClick={handleDelete} />
      <h2 className="note-heading">{props.heading}</h2>
      <p className="note-text">{props.text}</p>
    </div>
  );
}

export default Note;
