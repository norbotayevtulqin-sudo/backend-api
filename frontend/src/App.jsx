import { useEffect, useState } from "react";
import "./App.css";

const API = "https://backend-api-3zw9.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("Tekshirilmoqda...");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend bilan aloqa yo'q"));

    loadStudents();
  }, []);

  function loadStudents() {
    fetch(`${API}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }

  function saveStudent(e) {
    e.preventDefault();

    const data = {
      name,
      phone,
      group_name: group,
    };

    const url = editingId
      ? `${API}/students/${editingId}`
      : `${API}/students`;

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setName("");
      setPhone("");
      setGroup("");
      setEditingId(null);
      loadStudents();
    });
  }

  function editStudent(student) {
    setEditingId(student.id);
    setName(student.name);
    setPhone(student.phone || "");
    setGroup(student.group_name || "");
  }

  function deleteStudent(id) {
    if (!confirm("O'quvchini o'chirishni xohlaysizmi?")) return;

    fetch(`${API}/students/${id}`, {
      method: "DELETE",
    }).then(() => loadStudents());
  }

  return (
    <div className="app">
      <h1>O'quv markazi</h1>
      <p>O'quvchilarni boshqarish tizimi</p>

      <div className="card">
        <h2>Backend holati</h2>
        <p>{message}</p>
      </div>

      <div className="card">
        <h2>{editingId ? "O'quvchini tahrirlash" : "Yangi o'quvchi"}</h2>

        <form onSubmit={saveStudent}>
          <input
            placeholder="Ism"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Guruh"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Saqlash" : "O'quvchi qo'shish"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>O'quvchilar ro'yxati</h2>

        {students.map((student) => (
          <div key={student.id}>
            <b>{student.name}</b>
            <p>
              {student.phone || "—"} — {student.group_name || "—"}
            </p>

            <button onClick={() => editStudent(student)}>
              Tahrirlash
            </button>

            <button onClick={() => deleteStudent(student.id)}>
              O'chirish
            </button>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
