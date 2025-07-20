import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      await axios.post("http://localhost:8000/api/register", form, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.errors || err);
      alert("Errore nella registrazione");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="password_confirmation"
          type="password"
          placeholder="Conferma Password"
          onChange={handleChange}
        />
        <button className="btn btn-success" type="submit">
          Registrati
        </button>
      </form>
    </div>
  );
}
export default RegisterPage;
