import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./welcome-page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App