import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Backend tekshirilmoqda...')
  const [students, setStudents] = useState(false)

  useEffect(() => {
    fetch('https://backend-api-3zw9.onrender.com/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Backend bilan aloqa yo‘q'))
  }, [])

  return (
    <div className="app">
      <h1>O‘quv markazi</h1>
      <p>O‘quvchilarni boshqarish tizimi</p>

      <div className="card">
        <h2>Backend holati</h2>
        <p>{message}</p>
      </div>

      <button onClick={() => setStudents(true)}>
        O‘quvchilar
      </button>

      {students && (
        <div className="card">
          <h2>O‘quvchilar ro‘yxati</h2>
          <p>Hozircha o‘quvchilar yo‘q.</p>
        </div>
      )}
    </div>
  )
}

export default App
