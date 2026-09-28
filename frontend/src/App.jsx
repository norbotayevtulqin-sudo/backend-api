
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Backend tekshirilmoqda...')

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

      <button>O‘quvchilar</button>
    </div>
  )
}

export default App
