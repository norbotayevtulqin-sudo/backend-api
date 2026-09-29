import { useEffect, useState } from 'react'
import './App.css'

const API = 'https://backend-api-3zw9.onrender.com'

function App() {
  const [message, setMessage] = useState('Tekshirilmoqda...')
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [group, setGroup] = useState('')

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

  const addStudent = (e) => {
    e.preventDefault()

    if (!name) return

    fetch(`${API}/students`, {
      method: 'POST',
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
        loadStudents()
      })
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
        <h2>Yangi o‘quvchi</h2>

        <form onSubmit={addStudent}>
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
            O‘quvchi qo‘shish
          </button>
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
              <p>{student.phone} — {student.group_name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
