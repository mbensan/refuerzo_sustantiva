const express = require('express')
const { create_book, get_books, get_book, create_author, get_authors, authors_from_book} = require('./db.js')

const router = express.Router()

// RUTAS
router.get('/', async (req, res) => {
  const books = await get_books()
  res.render('books.html', { books })
})

router.get('/authors', async (req, res) => {
  res.render('authors.html')
})

router.get('/data/authors', async (req, res) => {
  const authors = await get_authors()
  res.json(authors)
})

// Forma de recibir llamadas AJAX con fetch
router.post('/authors', (req, res) => {
  let body = ''

  req.on('data', data => body += data )

  req.on('end', async () => {
    body = JSON.parse(body)
    console.log(body)

    const new_author = await create_author(body.name, body.lastname, body.notes)

    return res.json(new_author)
  })
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
router.get('/book/:id', async (req, res) => {
  const book = await get_book(req.params.id)
  const authors = await authors_from_book(req.params.id)
  const authors_yes = authors.authors_yes
  const authors_not = authors.authors_not
  console.log(authors_yes, authors_not)
  res.render('book.html', {book, authors_yes, authors_not})
})

module.exports = router