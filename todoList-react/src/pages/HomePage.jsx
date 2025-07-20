import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [userName, setUserName] = useState(""); // <- aggiunto

  useEffect(() => {
    const fetchUserAndData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Utente non autenticato");
        return;
      }

      try {
        const [tasksRes, prioritiesRes, userRes] = await Promise.all([
          axios.get("http://localhost:8000/api/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/priorities", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTasks(tasksRes.data);
        setPriorities(prioritiesRes.data);
        setUserName(userRes.data.name); // <- salva il nome
      } catch (err) {
        console.error("Errore nel caricamento:", err);
        setError(err.response?.data?.message || "Errore nella richiesta");
      }
    };

    fetchUserAndData();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const taskPriority = task.priority ? task.priority.name : "none";
    const matchPriority =
      selectedPriority === "" || taskPriority === selectedPriority;
    const matchDate =
      selectedDate === "" || (task.date && task.date >= selectedDate);
    return matchTitle && matchPriority && matchDate;
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-white">
        Ciao {userName || "utente"}, benvenuto nella tua agenda virtuale!
      </h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="Cerca task per titolo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <select
            className="form-select rounded-pill"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">Tutte le priorità</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.name}>
                {priority.name}
              </option>
            ))}
            <option value="none">Nessuna</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="date"
            className="form-control rounded-pill"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <h2 className="mt-5 mb-2 text-white">Elenco dei tuoi task:</h2>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredTasks.map((task) => (
          <div className="col" key={task.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                {task.priority ? (
                  <p>
                    Priorità:{" "}
                    <span
                      className="badge"
                      style={{ backgroundColor: task.priority.color || "#999" }}
                    >
                      {task.priority.name}
                    </span>
                  </p>
                ) : (
                  <p>
                    Priorità:{" "}
                    <span className="badge bg-secondary">Nessuna</span>
                  </p>
                )}
                <Link to={`/tasks/${task.id}`} className="btn btn-dark mt-4">
                  Visualizza Dettagli
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
