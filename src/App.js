import React from "react";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <MyRouter />
    </BrowserRouter>
  );
}

export default App;
