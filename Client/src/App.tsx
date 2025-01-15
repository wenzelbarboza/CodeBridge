import { BrowserRouter, Routes, Route } from "react-router";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <div className="dark ">
        <div className="dark:bg-gray-900 min-h-svh">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor/:id" element={<Editor />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
