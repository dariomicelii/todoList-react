import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AddForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [priority_id, setPriorityId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/priorities")
      .then((response) => {
        setPriorityId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching priorities:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    formData.append("date", parseInt(date));
    formData.append("priority_id", parseInt(priority_id));

    axios
      .post("http://localhost:8000/api/tasks", formData)
      .then((response) => {
        console.log("Task added:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-white">Aggiungi un nuovo impegno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">
            Titolo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label text-white">
            Note
          </label>
          <textarea
            className="form-control"
            id="note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label text-white">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label text-white">
            Priorità
          </label>
          <select
            className="form-select"
            id="priority"
            value={priority_id}
            onChange={(e) => setPriorityId(e.target.value)}
          >
            <option value="">Select priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}
export default AddForm;
