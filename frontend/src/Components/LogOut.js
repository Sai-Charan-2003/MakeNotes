import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  fetch("http://localhost:4000/logout", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then(() => {
      navigate("/");
    })
    .catch((err) => console.log(err));

  return <Spinner animation="grow" />;
}

export default LogOut;
