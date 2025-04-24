import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./pages/Home";
import FormPage from './pages/Questions'
import RecsPage from './pages/Recs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/recs" element={<RecsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
