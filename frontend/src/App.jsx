Zo‘r 👍 Endi yangi kodni qo‘yamiz. Bu versiyada **✏️ Tahrirlash** va **🗑️ O‘chirish** tugmalari bo‘ladi.

Nano ichiga quyidagi kodni **to‘liq qo‘ying**:

```jsx
import { useEffect, useState } from 'react'
import './App.css'

const API = 'https://backend-api-3zw9.onrender.com'

function App() {
  const [message, setMessage] = useState('Tekshirilmoqda...')
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [group, setGroup] = useState('')
  const [editingId, setEditingId] = useState(null)

  const loadStudents = () => {
    fetch(`${API}/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
  }

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Backend bilan aloqa yo‘q'))

    loadStudents()
  }, [])

  const saveStudent = (e) => {
    e.preventDefault()

    if (!name) return

    const url = editingId
      ? `${API}/students/${editingId}`
      : `${API}/students`

    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        group_name: group
      })
    })
      .then(res => res.json())
      .then(() => {
        setName('')
        setPhone('')
        setGroup('')
        setEditingId(null)
        loadStudents()
      })
  }

  const editStudent = (student) => {
    setEditingId(student.id)
    setName(student.name)
    setPhone(student.phone || '')
    setGroup(student.group_name || '')
  }

  const deleteStudent = (id) => {
    if (!confirm("Bu o‘quvchini o‘chirasizmi?")) return

    fetch(`${API}/students/${id}`, {
      method: 'DELETE'
    })
      .then(() => loadStudents())
  }

  return (
    <div className="app">
      <h1>O‘quv markazi</h1>
      <p>O‘quvchilarni boshqarish tizimi</p>

      <div className="card">
        <h2>Backend holati</h2>
        <p>{message}</p>
      </div>

      <div className="card">
        <h2>{editingId ? 'O‘quvchini tahrirlash' : 'Yangi o‘quvchi'}</h2>

        <form onSubmit={saveStudent}>
          <input
            placeholder="Ism"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="Telefon"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input
            placeholder="Guruh"
            value={group}
            onChange={e => setGroup(e.target.value)}
          />

          <button type="submit">
            {editingId ? 'Saqlash' : 'O‘quvchi qo‘shish'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setName('')
                setPhone('')
                setGroup('')
              }}
            >
              Bekor qilish
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h2>O‘quvchilar ro‘yxati</h2>

        {students.length === 0 ? (
          <p>Hozircha o‘quvchilar yo‘q.</p>
        ) : (
          students.map(student => (
            <div key={student.id}>
              <b>{student.name}</b>
              <p>
                {student.phone} — {student.group_name}
              </p>

              <button onClick={() => editStudent(student)}>
                ✏️ Tahrirlash
              </button>

              <button onClick={() => deleteStudent(student.id)}>
                🗑️ O‘chirish
              </button>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
```

**Hozircha saqlamang.** Kodni qo‘yib bo‘lgach, **“qo‘ydim”** deb yozing.

