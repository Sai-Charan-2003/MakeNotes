import "./CreateNote.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../serverUrl";
import { useForm } from "react-hook-form";

function CreateNote() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${serverUrl}createnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        notes: data,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create note. Please try again.");
        }
        return res.json();
      })
      .then(() => {
        setHeading("");
        setText("");
        navigate("/notes");
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="heading">Heading:</label>
        <input
          type="text"
          id="heading"
          className="input-field"
          {...register("heading", { required: "Heading is required" })}
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        {errors.heading && <p className="error">{errors.heading.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          className="textarea-field"
          {...register("text", { required: "Text is required" })}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {errors.text && <p className="error">{errors.text.message}</p>}
      </div>
      <button type="submit" className="create-button">
        Create
      </button>
    </form>
  );
}

export default CreateNote;
