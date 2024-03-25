import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

const login = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./db.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!jsonData) {
      console.error("JSON data not loaded yet");
      return;
    }

    const user = jsonData.find(
      (user) =>
        user.registerNumber === registerNumber && user.password === password
    );

    if (user) {
      console.log(registerNumber);

      navigate(`/BarchartData/${registerNumber}`);
    } else {
      console.log(password);
      alert("Invalid register_number or password");
      setErrorMessage("Invalid register_number or password");
    }
  };

  return (
    <div className="row">
      <div>
        <form className="container ">
          <div className="card border-3 border-black">
            <div className="card-header bg-blue-700 text-white">
              <h2>Student Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Register_Number<span className="errmsg"></span>
                </label>
                <input
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="form-control border-b-2 border-black"
                ></input>
              </div>
              <div className="form-group ">
                <label>
                  Password<span className="errmsg"></span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control border-b-2 border-black"
                ></input>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogin}
                type="submit"
                className=" bg-blue-700 text-white"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
