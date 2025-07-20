import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="container text-center mt-5">
      <h1>Benvenuto!</h1>
      <p>Accedi o registrati per usare l'app.</p>
      <Link to="/login" className="btn btn-primary me-2">
        Login
      </Link>
      <Link to="/register" className="btn btn-secondary">
        Register
      </Link>
    </div>
  );
}
