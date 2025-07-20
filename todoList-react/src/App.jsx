import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";
import Layout from "./components/layout";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import RequireAuth from "./components/RequireAuth";
import AnimatedBackground3D from "./components/AnimatedBackground";

function App() {
  return (
    <Router>
      <AnimatedBackground3D />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks/:id" element={<ShowPage />} />
            <Route path="/create" element={<AddForm />} />
            <Route path="/edit/:id" element={<EditForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
