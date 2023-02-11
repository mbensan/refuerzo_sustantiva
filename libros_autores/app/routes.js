const express = require('express')
const { create_book, get_books } = require('./db.js')

const router = express.Router()

// RUTAS
router.get('/', async (req, res) => {
  const books = await get_books()
  res.render('books.html', { books })
})

router.get('/authors', (req, res) => {
  res.render('authors.html', {user: ''})
})

// creación de libro
router.post('/books',  async (req, res) => {
  console.log(req.body)
  await create_book(req.body.title, req.body.description)
  res.redirect('/')
})

// detalle de UN libro
router.get('/book/:id', (req, res) {
  res.send('Detalle del libro de ID '+ req.params.id)
})

module.exports = router