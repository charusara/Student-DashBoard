import "./App.css";
import Login from "./login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BarChartData from "./BarchartData.jsx";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center"></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/BarchartData/:registerNumber"
            element={<BarChartData />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
