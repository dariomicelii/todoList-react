import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ShowPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Utente non autenticato");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(res.data);
      } catch (err) {
        console.error("Si è verificato un errore:", err);
        setError(err.response?.data?.message || "Errore nella richiesta");
      }
    };

    fetchTasks();
  }, []);

  if (!task) return <p>Caricamento...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-white">Dettagli Task</h1>
      <h3 className="text-white">{task.title}</h3>
      <p className="text-white">{task.note}</p>
      <p className="text-white">Data: {task.date}</p>
      {task.priority ? (
        <span
          className="badge"
          style={{ backgroundColor: task.priority.color }}
        >
          {task.priority.name}
        </span>
      ) : (
        <span className="badge bg-secondary">Nessuna priorità</span>
      )}
    </div>
  );
}

export default ShowPage;
