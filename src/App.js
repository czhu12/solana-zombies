import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ShowLesson from "./ShowLesson";
import IndexLessons from "./IndexLessons";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/lessons" element={<ShowLesson />} />
            <Route path="/" element={<IndexLessons />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
