import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../serverUrl";

function LogOut() {
  const navigate = useNavigate();
  fetch(`${serverUrl}logout`, {
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
