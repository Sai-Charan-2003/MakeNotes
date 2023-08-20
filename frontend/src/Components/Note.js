import "./Note.css";
import { serverUrl } from "../serverUrl";
import { Link } from "react-router-dom";

function Note(props) {
  //eslint-disable-next-line
  var response;
  const handleDelete = () => {
    fetch(`${serverUrl}delete`, {
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
      <div className="dropdown">
        <button className="dropbtn">&#8942;</button>
        <div className="dropdown-content">
          <Link
            to={"/updatenote"}
            state={{ heading: props.heading, text: props.text }}
          >
            Update
          </Link>
          <a href="/notes" onClick={handleDelete}>
            Delete
          </a>
        </div>
      </div>
      <h2 className="note-heading">{props.heading}</h2>
      <p className="note-text">{props.text}</p>
    </div>
  );
}

export default Note;
