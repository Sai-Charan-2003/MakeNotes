import "./CreateNote.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "dotenv";

function CreateNote() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/createnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        notes: { heading, text },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setHeading("");
    setText("");
    navigate("/notes");
  };

  return (
    <form className="form-container" method="POST" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="heading">Heading:</label>
        <input
          type="text"
          id="heading"
          className="input-field"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          className="textarea-field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="create-button">
        Create
      </button>
    </form>
  );
}

export default CreateNote;
