const express = require('express')
const cors = require('cors')

const app = express()

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>')
})
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', ({ body }, res) => {
  const ids = notes.map(n => n.id)
  const maxId = Math.max(...ids)

  const newNote = { ...body, id: maxId + 1 }
  notes = [...notes, newNote]

  res.status(201).json(newNote)
})
app.get('/api/notes/:id', ({ params: { id } }, res) => {
  const note = notes.find(n => n.id === +id)
  if (!note) return res.status(404).json({ success: false, msg: 'Resource not found' })

  res.json(note)
})
app.delete('/api/notes/:id', ({ params: { id } }, res) => {
  const note = notes.find(n => n.id === +id)
  if (!note) return res.status(404).json({ success: false, msg: 'Resource not found' })

  notes = notes.filter(n => n.id !== +id)
  res.status(204).end()
})
app.get('*', (req, res) => res.status(404).json({ success: false, msg: 'Resource not found' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server run on port ${PORT}`))
