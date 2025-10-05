import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./Components/Header";
import Card from "./Components/Card";
import AddNote from "./Components/AddNote";
import EditNote from "./Components/EditNote";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Card />
            </>
          }
        />
        <Route path="/addNote" element={<AddNote />} />
        <Route path="/editNote" element={<EditNote />} />
      </Routes>
    </>
  );
}

export default App;
