import { Home } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router";
import Editor from "./pages/editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
