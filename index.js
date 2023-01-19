const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

/* Index page */
app.get('/', (request, response) => {
  response.send('<h1>Hello World!!!</h1>')
})

/* Phonebook JSON page */
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

/* Info page */
app.get('/info', (request, response) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`;
  response.send(info);
})

/* Getting the prson's phoneinfo with the id that is passed in. */
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

/* Deleting the phoneinfo with the id that is passed in. */
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const idRamdom = Math.floor(Math.random() * 100000);
  const maxId = persons.length > 0
    ? persons.find(person => person.id === idRamdom)
      ? generateId()
      : idRamdom
    : 1;
  
  return maxId;
}

/* A post request that is sending the data to the server. */
app.post('/api/persons', (request, response) => {
  
  const body = request.body;
  // console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person);
  console.log(person);
  response.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})