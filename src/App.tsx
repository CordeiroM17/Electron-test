import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Shooter from "./pages/Shooter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/shooters" element={<Shooter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
