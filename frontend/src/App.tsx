import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "motion/react";

import HomePage from "./pages/Home";
import FormPage from './pages/Questions'
import RecsPage from './pages/Recs'

// Create a separate component that uses the location hook
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/recs" element={<RecsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // BrowserRouter at the top level, no useLocation hook here
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;