import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screen/Home";
import Createuser from "./Screen/Createuser";
import Edituser from "./Screen/Edituser";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/createuser" element={<Createuser />} />
        <Route path="edituser/:id" element={<Edituser />} />
      </Routes>
    </>
  );
}

export default App;
